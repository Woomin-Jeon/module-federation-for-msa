# Module Federation을 이용한 MSA 구현하기

## 패키지

### @module-federation/store

- recoil을 사용해서 구현
- 서로 다른 앱들이 동일한 atom을 참조해서 전역상태를 공유할 수 있도록 모듈화시킨 패키지

### @module-federation/container

- 여러 앱들을 하나로 모아서 호출해주는 컨테이너 역할

### @module-federation/app1

- 앱 1

### @module-federation/app2

- 앱 2

---

## 구현

- `container`의 local state를 `app1`과 `app2`이 props로 주입받아서 사용 가능
- `store`에서 관리되는 global state를 `container`, `app1`, `app2`가 모두 공유하여 사용 가능

---

## Getting Started

```
$ yarn

terminal1: $ yarn workspace @module-federation/container start
terminal2: $ yarn workspace @module-federation/app1 start
terminal3: $ yarn workspace @module-federation/app2 start

open http://localhost:8000
```
