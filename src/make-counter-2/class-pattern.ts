class Counter {
  private value: number;

  // 1. 클로저 변수로 관리하지 않아서 초기값 인스턴스 변수가 하나 더 필요하다.
  private readonly initialValue: number;

  constructor(initialValue: number = 0) {
    this.value = initialValue;
    this.initialValue = initialValue;
  }

  // get = (): number => {
  //   return this.value;
  // };

  get() {
    return this.value;
  }

  // 2. 메서드를 일반 함수로 작성하면, 다음과 같은 상황에 this 바인딩이 깨진다.
  // increment() {
  //   const nextValue = this.value + 1;
  //   this.value = nextValue;

  //   return nextValue;
  // }

  // 문제 상황 1: 메서드 추출
  // const inc = counter.increment;

  // 문제 상황 2: 콜백으로 전달
  // setTimeout(counter.increment, 1000);

  // 문제 상황 3: 이벤트 핸들러
  // button.addEventListener('click', counter.increment);

  // 3. 화살표 함수는 this 를 바인딩하지만, prototype 에 메서드를 생성하지 않고 인스턴스마다 새로운 함수 객체를 생성한다.

  increment = (): number => {
    const nextValue = this.value + 1;
    this.value = nextValue;

    return nextValue;
  };

  decrement = (): number => {
    const nextValue = this.value - 1;
    this.value = nextValue;

    return nextValue;
  };

  reset = (): void => {
    const nextValue = this.initialValue;
    this.value = nextValue;
  };
}

export const makeCounter = (initialValue?: number) => {
  return new Counter(initialValue);
};
