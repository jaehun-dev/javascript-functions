import { describe, it, expect } from "vitest";
import { makeCounter } from "./class-pattern";

describe("makeCounter", () => {
  describe("기본 초기값(0)으로 생성", () => {
    it("초기값이 0이어야 한다", () => {
      const counter = makeCounter();
      expect(counter.get()).toBe(0);
    });

    it("increment()는 값을 1 증가시키고 증가된 값을 반환해야 한다", () => {
      const counter = makeCounter();
      expect(counter.increment()).toBe(1);
      expect(counter.get()).toBe(1);

      expect(counter.increment()).toBe(2);
      expect(counter.get()).toBe(2);
    });

    it("decrement()는 값을 1 감소시키고 감소된 값을 반환해야 한다", () => {
      const counter = makeCounter();
      expect(counter.decrement()).toBe(-1);
      expect(counter.get()).toBe(-1);

      expect(counter.decrement()).toBe(-2);
      expect(counter.get()).toBe(-2);
    });

    it("reset()은 값을 초기값으로 재설정해야 한다", () => {
      const counter = makeCounter();
      counter.increment();
      counter.increment();
      expect(counter.get()).toBe(2);

      counter.reset();
      expect(counter.get()).toBe(0);
    });
  });

  describe("사용자 정의 초기값으로 생성", () => {
    it("지정한 초기값으로 시작해야 한다", () => {
      const counter = makeCounter(5);
      expect(counter.get()).toBe(5);
    });

    it("increment()는 사용자 정의 초기값에서도 정상 작동해야 한다", () => {
      const counter = makeCounter(10);
      expect(counter.increment()).toBe(11);
      expect(counter.increment()).toBe(12);
    });

    it("decrement()는 사용자 정의 초기값에서도 정상 작동해야 한다", () => {
      const counter = makeCounter(5);
      expect(counter.decrement()).toBe(4);
      expect(counter.decrement()).toBe(3);
    });

    it("reset()은 사용자 정의 초기값으로 재설정해야 한다", () => {
      const counter = makeCounter(5);
      counter.decrement();
      counter.decrement();
      expect(counter.get()).toBe(3);

      counter.reset();
      expect(counter.get()).toBe(5);
    });
  });

  describe("각 카운터 인스턴스의 독립성", () => {
    it("여러 카운터가 서로 독립적이어야 한다", () => {
      const counter1 = makeCounter();
      const counter2 = makeCounter(10);

      counter1.increment();
      counter2.decrement();

      expect(counter1.get()).toBe(1);
      expect(counter2.get()).toBe(9);
    });
  });

  describe("메서드 체이닝은 불가능", () => {
    it("reset()은 undefined를 반환해야 한다", () => {
      const counter = makeCounter();
      expect(counter.reset()).toBeUndefined();
    });
  });

  describe("타입 검증", () => {
    it("반환된 객체는 필요한 모든 메서드를 가져야 한다", () => {
      const counter = makeCounter();
      expect(typeof counter.get).toBe("function");
      expect(typeof counter.increment).toBe("function");
      expect(typeof counter.decrement).toBe("function");
      expect(typeof counter.reset).toBe("function");
    });
  });

  describe("this 바인딩 검증", () => {
    it("메서드 추출 시 this 바인딩이 깨진다", () => {
      const counter = makeCounter();
      const inc = counter.increment;
      expect(inc()).toBe(1);
    });
  });

  describe("prototype 메서드 공유 검증", () => {
    it("prototype 메서드는 모든 인스턴스가 공유해야 한다", () => {
      const counter1 = makeCounter();
      const counter2 = makeCounter();

      expect(counter1.get).toBe(counter2.get);
    });

    it("메서드가 prototype에 정의되어 있어야 한다", () => {
      const counter = makeCounter();

      const proto = Object.getPrototypeOf(counter);

      expect(proto.hasOwnProperty("get")).toBe(true);
    });
  });
});
