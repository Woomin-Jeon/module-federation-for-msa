# Module Federation을 이용한 MSA

## 구현 동기

- 점점 커지는 프로젝트를 나눠서 관리하고 싶은 니즈
- 하지만 프로젝트를 분리하게 되면 프로젝트 간의 상태를 공유할 수 없음
- Webpack 5에서 제공하는 Module Federation으로 해결하면 어떨까?

<img width="500px" src="https://user-images.githubusercontent.com/59194356/170876635-8cfeb6cc-b8c5-4a7a-838e-b6472fe42c0b.png" />

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
- `CopyWebpackPlugin`을 통해 `app1`과 `app2`의 빌드 결과물을 `container/build`에서 관리함으로써 싱글 도메인으로 배포 가능하도록 구현 (app1과 app2를 호스팅하기 위한 각각 별도의 도메인 없어도 됨)
- 그리고 이 과정에서 topological build를 위해 [Turborepo](https://turborepo.org) 도입

---

## Getting Started

```
>>> development mode
terminal0: $ yarn
terminal1: $ yarn workspace @module-federation/container start
terminal2: $ yarn workspace @module-federation/app1 start
terminal3: $ yarn workspace @module-federation/app2 start
open http://localhost:8000

>>> production mode
$ yarn build
```
