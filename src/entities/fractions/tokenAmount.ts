import { BigintIsh } from '../../constants'
import { CurrencyAmount } from './currencyAmount'
import JSBI from 'jsbi'
import { Token } from '../token'
import invariant from 'tiny-invariant'

export class TokenAmount extends CurrencyAmount {
  public readonly token: Token

  // amount _must_ be raw, i.e. in the native representation
  public constructor(token: Token, amount: BigintIsh) {
    super(token, amount)
    this.token = token
  }

  public add(other: TokenAmount): TokenAmount {
    invariant(this.token.equals(other.token), 'TOKEN')
    return new TokenAmount(this.token, JSBI.add(this.raw, other.raw))
  }

  public subtract(other: TokenAmount): TokenAmount {
    invariant(this.token.equals(other.token), 'TOKEN')
    return new TokenAmount(this.token, JSBI.subtract(this.raw, other.raw))
  }
}
