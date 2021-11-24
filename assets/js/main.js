class Calculator {
  constructor() {
    this.prevOperandTxElem = document.querySelector('[data-previous-operand]')
    this.currOperandTxElem = document.querySelector('[data-current-operand]')

    this.clear()

    document.querySelector('.calculator-buttons').addEventListener('click', ev => {
      switch (ev.target.dataset.action) {
        case 'number':
          this.appendNumber(ev.target.innerText)
          break;

        case 'operation':
          this.chooseOpertion(ev.target.innerText)
          break;

        case 'equals':
          this.compute()
          break;

        case 'all-clear':
          this.clear()
          break;

        case 'delete':
          this.deleteNumber()
          break;

        default:
          break;
      }
      this.updateDiasplay()
    })
  }

  clear() {
    this.prevOperand = ''
    this.currOperand = ''
    this.operation = undefined
  }

  deleteNumber() {
    this.currOperand = this.currOperand.slice(0, -1)
  }

  appendNumber(number) {
    if (number == '.' && this.currOperand.includes(number)) return

    if (!this.currOperand.length && number == '.') this.currOperand = '0'

    this.currOperand = this.currOperand + number
  }

  formatDisplayNumber(number) {
    number = number.toString()

    let intPart = +number.split('.')[0]

    let floatPart = +number.split('.')[1]

    if (floatPart) return intPart.toLocaleString('ru') + '.' + floatPart

    if (number.includes('.')) return intPart.toLocaleString('ru') + '.'

    return intPart.toLocaleString('ru')
  }

  chooseOpertion(operation) {
    if (this.currOperand == '') return

    if (this.prevOperand != '') this.compute()

    this.operation = operation
    this.prevOperand = this.currOperand
    this.currOperand = ''
  }

  compute() {
    let result
    let prev = parseFloat(this.prevOperand)
    let curr = parseFloat(this.currOperand)

    if (isNaN(prev) || isNaN(curr)) return

    switch (this.operation) {
      case '÷':
        result = prev / curr
        break;
      case '*':
        result = prev * curr
        break;
      case '-':
        result = prev - curr
        break;
      case '+':
        result = prev + curr
        break;
      default:
        return
    }

    this.clear()

    this.currOperand = result
  }

  updateDiasplay() {
    this.currOperandTxElem.innerText = this.formatDisplayNumber(this.currOperand)
    if (this.operation != null) {
      this.prevOperandTxElem.innerText = this.prevOperand + ' ' + this.operation
      return
    }
    this.prevOperandTxElem.innerText = this.prevOperand
  }
}

new Calculator()