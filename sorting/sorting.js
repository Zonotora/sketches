class Sorting {
  // Selection Sort
  static async selection(a, s) {
    for (let i = 0; i < a.length; i++) {
      let index = i;
      s[i] = 1;
      for (let j = i + 1; j < a.length; j++) {
        s[j] = 0;
        await Sorting.sleep(10);
        if (a[j] < a[index]) {
          index = j;
        }
        s[j] = -1;
      }
      s[index] = 0;
      await Sorting.exch(a, i, index);
      s[index] = -1;
      s[i] = -1;
    }
    await Sorting.is_sorted(a, s, 0, a.length - 1);
  }

  // Quicksort
  static async quicksort(a, s) {
    await Sorting.quicksort1(a, s, 0, a.length - 1);
    await Sorting.is_sorted(a, s, 0, a.length - 1);
  }

  static async quicksort1(a, s, lo, hi) {
    if (hi <= lo) {
      return;
    }
    const j = await Sorting.partition(a, s, lo, hi);
    await Promise.all([
      Sorting.quicksort1(a, s, lo, j - 1),
      Sorting.quicksort1(a, s, j + 1, hi),
    ]);
  }

  static async partition(a, s, lo, hi) {
    for (let i = lo; i < hi; i++) {
      s[i] = 1;
    }
    let i = lo;
    let j = hi + 1;
    const v = a[lo];
    while (a[++i] < v) {
      if (i === hi) {
        s[i] = 1;
        await Sorting.exch(a, lo, hi);
        s[i] = -1;
        return hi;
      }
    }

    while (v < a[--j]) {
      if (j === lo + 1) {
        return lo;
      }
    }

    while (i < j) {
      s[i] = 0;
      await Sorting.exch(a, i, j);
      s[i] = -1;
      while (a[++i] < v);
      while (v < a[--j]);
    }
    await Sorting.exch(a, lo, j);
    for (let k = lo; k < hi + 1; k++) {
      if (k !== j) {
        s[k] = -1;
      }
    }

    return j;
  }

  static async partition1(arr, s, start, end) {
    for (let i = start; i < end; i++) {
      s[i] = 1;
    }

    let pivotValue = arr[end];
    let pivotIndex = start;
    s[pivotIndex] = 0;
    for (let i = start; i < end; i++) {
      if (arr[i] < pivotValue) {
        await Sorting.exch(arr, i, pivotIndex);
        s[pivotIndex] = -1;
        pivotIndex++;
        s[pivotIndex] = 0;
      }
    }
    await Sorting.exch(arr, pivotIndex, end);

    for (let i = start; i < end; i++) {
      if (i < pivotIndex) {
        s[i] = -1;
      }
    }

    return pivotIndex;
  }

  // Cocktail Sort

  static async cocktail(a, s) {
    let i = 0;
    let dir = 1;
    let lo = 0;
    let hi = a.length - 1;
    let index = 0;
    let lock = true;
    while (true) {
      s[i] = 0;
      if (a[index] * dir < a[i] * dir) {
        s[index] = -1;
        index = i;
        s[index] = 1;
      }

      if (hi <= lo) {
        break;
      } else if (i >= hi && !lock) {
        dir = -1;
        await Sorting.exch(a, i, index);
        hi--;
        s[index] = -1;
        index = i;
        lock = true;
      } else if (i <= lo && !lock) {
        dir = 1;
        await Sorting.exch(a, i, index);
        lo++;
        s[index] = -1;
        index = i;
        lock = true;
      } else {
        lock = false;
      }
      await Sorting.sleep(10);
      if (i !== index) {
        s[i] = -1;
      }
      i += dir;
    }
    await Sorting.is_sorted(a, s, 0, a.length - 1);
  }

  // Bubble Sort

  static async bubble(a, s) {
    let hi = a.length - 1;
    while (true) {
      for (let i = 0; i < hi; i++) {
        s[i] = 0;
        await Sorting.sleep(10);
        if (a[i] > a[i + 1]) {
          s[i + 1] = 1;
          await Sorting.exch(a, i, i + 1);
        }
        s[i] = -1;
        s[i + 1] = -1;
      }
      hi--;
      if (hi <= 0) {
        break;
      }
    }
    await Sorting.is_sorted(a, s, 0, a.length - 1);
  }

  // Insertion Sort
  static async insertion(a, s) {
    for (let i = 0; i < a.length; i++) {
      for (let j = i; j > 0; j--) {
        s[j] = 0;
        if (a[j] < a[j - 1]) {
          s[j - 1] = 1;
          await Sorting.exch(a, j, j - 1);
        }
        s[j - 1] = -1;
        s[j] = -1;
      }
    }
    await Sorting.is_sorted(a, s, 0, a.length - 1);
  }

  // Shell Sort

  static async shell(a, s) {
    const gaps = [701, 301, 132, 57, 23, 10, 4, 1];

    for (let k = 0; k < gaps.length; k++) {
      const gap = gaps[k];
      for (let i = gap; i < a.length; i++) {
        const tmp = a[i];
        let j;
        for (j = i; j >= gap && a[j - gap] > tmp; j -= gap) {
          s[j] = 0;
          s[j - gap] = 1;
          await Sorting.sleep(50);
          a[j] = a[j - gap];
          s[j] = -1;
          s[j - gap] = -1;
        }
        a[j] = tmp;
      }
    }
    await Sorting.is_sorted(a, s, 0, a.length - 1);
  }

  // Merge Sort
  static async merge(a, s) {
    let aux = JSON.parse(JSON.stringify(a));
    await Sorting.merge1(a, s, 0, a.length - 1, aux);
    await Sorting.is_sorted(a, s, 0, a.length - 1);
  }

  static async merge1(a, s, lo, hi, aux) {
    if (hi <= lo) {
      return;
    }
    const mid = lo + Math.floor((hi - lo) / 2);
    await Promise.all([
      Sorting.merge1(a, s, lo, mid, aux),
      Sorting.merge1(a, s, mid + 1, hi, aux),
    ]);
    await Sorting.merge2(a, s, lo, mid, hi, aux);
  }

  static async merge2(a, s, lo, mid, hi, aux) {
    let i = lo;
    let j = mid + 1;
    for (let k = lo; k <= hi; k++) {
      aux[k] = a[k];
    }
    for (let k = lo; k <= hi; k++) {
      if (i > mid) {
        a[k] = aux[j++];
        await Sorting.sleep(50);
      } else if (j > hi) {
        a[k] = aux[i++];
        await Sorting.sleep(50);
      } else if (aux[j] < aux[i]) {
        a[k] = aux[j++];
        s[k] = 0;
        s[j - 1] = 1;
        await Sorting.sleep(50);
        s[k] = -1;
        s[j - 1] = -1;
      } else {
        a[k] = aux[i++];
        await Sorting.sleep(50);
      }
    }
  }

  static async is_sorted(a, s, lo, hi) {
    for (let i = lo; i < hi; i++) {
      s[i] = 2;
      if (a[i] > a[i + 1]) {
        for (let j = lo; j < hi + 1; j++) {
          s[j] = -1;
        }
        return false;
      }
      await Sorting.sleep(10);
    }
    s[s.length - 1] = 2;
    return true;
  }

  static async exch(a, i, j) {
    await Sorting.sleep(50);
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }

  static sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
