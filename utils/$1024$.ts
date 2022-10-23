function permutation<T>(arr: T[], arr_len = arr.length, res: T[][] = []) {
  const swap = (_a: number, _b: number) => ([arr[_a], arr[_b]] = [arr[_b], arr[_a]])

  if (arr_len === 1) res.push([...arr])

  for (let i = 0; i < arr_len; i++) {
    permutation(arr, arr_len - 1, res)
    arr_len % 2 === 1 ? swap(0, arr_len - 1) : swap(i, arr_len - 1)
  }

  return res
}

function combination<T>(arr: T[], amount: number) {
  let result: T[][] = [],
    path: T[] = []

  const recur = (i: number) => {
    if (path.length === amount) {
      result.push([...path])
      return
    }

    for (; i < arr.length; i++) {
      path.push(arr[i])
      recur(i + 1)
      path.pop()
    }
  }

  recur(0)

  return result
}

function group<T>(arr: T[], amount: number = arr.length) {
  const res: T[][] = []
  combination(arr, amount).forEach((c) => res.push(...permutation(c)))
  return res
}

function unique<T>(arr: T[][], isNum: boolean = true) {
  const set: Set<string> = new Set()
  arr.forEach((a) => set.add(a.join('#')))
  return Array.from(set.values()).map((a) => a.split('#').map((v) => (isNum ? Number.parseInt(v, 10) : v))) as T[][]
}

function calc(lsh: number, symbol: string, rsh: number) {
  let result = 0
  const isOverflow = (num: number) => num > 0x7fffffff || num < -0x7fffffff

  switch (symbol) {
    case '+':
    case '-':
      result = symbol === '+' ? lsh + rsh : lsh - rsh
      if (isOverflow(result)) throw new Error('Add/Sub operation overflow occurs')
      return result

    case '*':
      result = lsh * rsh
      if (isOverflow(result)) throw new Error('Multiply operation overflow occurs')
      return result

    case '**':
      result = Math.pow(lsh, rsh)
      if (isOverflow(result)) throw new Error('Exponential operation overflow occurs')
      return result

    case '//':
      result = Math.floor(lsh / rsh)
      if (isOverflow(result)) throw new Error('Divide operation overflow occurs')
      return result

    case '>>':
      result = lsh >> Math.min(31, rsh)
      return result

    case '<<':
      if (Math.clz32(lsh) < rsh) throw new Error('Right shifted operation overflow occurs')
      return lsh << rsh

    case '%':
      return lsh % rsh

    case '|':
      return lsh | rsh

    case '&':
      return lsh & rsh

    case '^':
      return lsh ^ rsh

    default:
      throw new Error('Invalid symbol or SHR')
  }
}

function calcAll(nums: number[], syms: string[]) {
  let n1 = nums[0]
  for (let i = 0; i < 3; i++) {
    try {
      n1 = calc(n1, syms[i], nums[i + 1])
    } catch (error) {
      // If an error occurs, it returns a value other than 1024
      return 0
    }
  }
  return n1
}

export default function $1024$(numCards: number[], symCards: string[]) {
  if (numCards.length < 4 || symCards.length < 3) {
    alert('Not enough number cards or symbol cards!')
    return []
  }

  const result: {
    numbers: number[]
    symbols: string[]
  }[] = []
  const numGroups = unique(group(numCards, 4)),
    symGroups = unique(group(symCards, 3), false)

  for (let n of numGroups) {
    for (let s of symGroups) {
      if (calcAll(n, s) === 1024) {
        result.push({
          numbers: n,
          symbols: s,
        })
      }
    }
  }

  return result
}
