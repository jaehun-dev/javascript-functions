export function makeCounter(initialValue = 0) {
  // 1. private 하여 외부에서 접근이 불가능하다.
  let value = initialValue;

  // 2. this 바인딩 없이 클로저 변수에 직접 접근.
  // 3. makeCounter 함수 객체를 생성할 때마다 메서드가 4개씩 생성된다. -> Class 는 prototype 으로 메서드를 공유한다.
  function get() {
    return value;
  }

  function increment() {
    return (value += 1);
  }

  function decrement() {
    return (value -= 1);
  }

  function reset() {
    value = initialValue;
  }

  return {
    get,
    increment,
    decrement,
    reset,
  };
}
