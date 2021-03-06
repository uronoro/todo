<template>
  <div class="bg-success vh-100 pt-5">
    <div class="row">
      <div class="col-3">
        <ActionButtons
          :is-disp="isDispDealer"
          @onDispDealer="dispDealer"
          @onGame="game"
          @onInit="init"
          @onPlayerDraw="playerDraw"
          />
      </div>
      <div class="col-4 offset-1">
        <Hands
          :hands="players"
          :playerName="'プレイヤー'"
          :sum-count="calcHands(players)"
        />
      </div>
      <div class="col-4">
        <Hands
          :hands="dealers"
          :is-disp="isDispDealer"
          :playerName="'ディーラー'"
          :sum-count="calcHands(dealers)"
        />
      </div>
    </div>
    <BurstModal :is-burst="isBurst" @onInit="init" />
    <ResultModal
      :result="result"
      :player-count="calcHands(players)"
      :dealer-count="calcHands(dealers)"
      @onInit="init" />
  </div>
</template>

<script>
import ActionButtons from '../../components/blackjack/ActionButtons.vue'
import Hands from '../../components/blackjack/Hands.vue'
import BurstModal from '../../components/blackjack/BurstModal.vue'
import ResultModal from '../../components/blackjack/ResultModal.vue'

export default {
  components: {
    ActionButtons,
    Hands,
    BurstModal,
    ResultModal,
  },

  data: () => ({
    cards: [],
    cardCount: 13,
    marks: ['spade', 'club', 'diamond', 'heart'],

    // 手札
    players: [],
    dealers: [],

    // ディーラーの手札を表示しない
    isDispDealer: false,

    result: '',
  }),

  computed: {
    /**
     * カード枚数
     */
    cardNumber() {
      return this.cards.length
    },

    /**
     * 手持ちのカード合計値が21を超えた場合はBURST
     *
     * @return {Bool}
     */
    isBurst() {
      const point = this.calcHands(this.players)

      if (point > 21) {
        return true
      }

      return false
    },
  },

  created() {
    this.init()
  },

  methods: {
    /**
     * トランプの生成
     */
    initTrump() {
      this.cards = []

      this.marks.forEach((mark) => {
        [...Array(this.cardCount).keys()].forEach((number) => {
          // ダイヤとハートは色を変更する
          const isChangeColor = (mark === 'diamond' || mark === 'heart')
          this.cards.push({ number: number + 1, mark, isChangeColor })
        })
      })
    },

    /**
     * トランプを2枚ずつ引いた状態にする
     */
    init() {
      this.initTrump()

      this.players = []
      this.dealers = []
      this.result = ''

      // 2枚ずつカードを引く
      this.playerDraw()
      this.playerDraw()

      this.dealerDraw()
      this.dealerDraw()
    },

    /**
     * カードを引く
     * todo spliceの影響で配列になっているのでオブジェクトだけを取り出したい
     * そうなると[0]の記述不要
     *
     * @return {Array} [{ number, mark, isChangeColor }]
     */
    draw() {
      const randomKey = Math.floor(Math.random() * (this.cardNumber))
      return this.cards.splice(randomKey, 1)
    },

    /**
     * 手札合計値を返す
     *
     * @param {Array} hands
     * @return {Number}
     */
    calcHands(hands) {
      // Aを最後に処理出来るようにnumberを降順で並べた値渡しで合計値を計算する
      const tempHands = Object.assign([], hands)
      const sortedHands = tempHands.sort((a, b) => b[0].number - a[0].number)

      return sortedHands.reduce((sum, hand) => {
        let { number } = hand[0]
        if (number >= 10) number = 10

        // Aの処理
        // todo マジックナンバーだらけですみません
        if (number === 1 && sum + 11 <= 21) {
          number = 11
        }

        return sum + number
      }, 0)
    },

    /**
     * ディーラーと勝負する
     */
    game() {
      const playerPoint = this.calcHands(this.players)
      const dealerPoint = this.calcHands(this.dealers)

      if (playerPoint > dealerPoint) this.result = 'win'
      if (playerPoint < dealerPoint) this.result = 'lose'
      if (playerPoint === dealerPoint) this.result = 'draw'
    },

    /**
     * プレイヤーがカードを引く
     */
    playerDraw() {
      this.players.push(this.draw())
    },

    /**
     * ディーラーがカードを引く
     */
    dealerDraw() {
      this.dealers.push(this.draw())
    },

    /**
     * ディーラーの手札を表示するか隠すか
     *
     * @param {Bool} isDisp
     */
    dispDealer(isDisp) {
      this.isDispDealer = isDisp
    },
  },
}
</script>
