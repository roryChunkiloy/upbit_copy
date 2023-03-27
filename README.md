배포 사이트 : https://upbit-copy-git-main-rorychunkiloy.vercel.app

현재 홈페이지와 거래소 페이지만 작업되었습니다.

구현된 주요 기능

1. 차트 드래그 기능

2. 코인 종류 새로고침시 기억하는 기능

아직 enhance 요소가 많이 남은 작업입니다. 막상 만들다보니 기능 구현에서도 많은 고민이 필요했고, 라이브러리 사용법도 많이 미숙해서 돌아가는 코드 구현으로 덮어놓은 부분이 많습니다. 코드 중간중간 주석 처리된 부분은 enhance가 필요한 곳으로 꾸준히 작업할 예정입니다.

그 외에 지금 단계에서 기능적으로 구현을 포기한 부분이 있습니다. 앞으로 해야할 굵직한 작업 내용들

1. 코인 리스트 sort order 기능

2. 차트 종류를 기억하는 기능. 업비트에서는 차트 종류를 기억합니다. 그래서 새로고침해도 차트 종류가 유지됩니다. 제 프로젝트에서는 코인의 종류만을 qs으로 저장하고 있습니다. 업비트는 qs가 아닌 다른 방법을 사용하고 있는 것 같습니다. 이 방법을 아직 찾지 못했고, 그래서 일단 이 부분을 구현하지는 않았습니다. 

3. chart component 코드 개선 - d3 라이브러리가 생각보다 복잡하고 어려웠습니다. 그리고 react에서 사용할 때 조금 unfit하다는 느낌도 들었습니다. 이 부분이 해소되는 visx 라이브러리는 좀 더 공부 or d3를 제대로 공부해서 코드 퀄리티를 개선해야합니다. 일단 d3 라이브러리를 부분적으로만 이용해서 그려만 놨습니다. 

4. 반응형 디자인