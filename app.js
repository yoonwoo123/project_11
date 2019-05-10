const HOST = "http://django-intro-yoonwoo.c9users.io:8080/api/v1"

const app = new Vue({
  el: "#app",
  data: {
    logo: 'MO<i class="fab fa-vuejs"></i>IE',
    isMain: true,
    genres: [],
    movies: [],  // 현재 하드 타이핑 된 배열이지만, 실제로는 axios.get() 을 통해 API server 로 부터 받아옵니다.
    scores: [],
    newContent: "",
    newScore: 1,
    search: '', // 검색 기능을 구현할 때, 사용자의 입력 값을 이곳에 쌍방향 바인딩 합니다.

    detailView: false, // 현재 방식의 목록/상세 화면 전환에 사용되는 flag 입니다.
    movieDetail: {
    },  // 상세 화면에서 출력할 때 사용할 영화 객체입니다.
  },
  methods: {
    toggleDetail: function(movie) {  // 목록 <=> 상세 화면을 전환합니다. 인자로 id 가 들어올 경우, 상세화면을 표시합니다.
      if (movie) {
        this.movieDetail = movie
        // const movie = this.movies[0]  // 현재는 무조건 $data.movies 의 첫 번째 영화를 선택합니다. 실제로는 인자로 넘어온 id 를 통해 특정 영화를 찾습니다.
      }
      this.detailView = !this.detailView
    },
    createScore: function(movieDetail){
      const data = {content: this.newContent, score: this.newScore}
      console.log(data)
      axios.post(`${HOST}/movies/${movieDetail.id}/scores/`, data)
        .then(response => {
          movieDetail.scores.push(response.data)
          this.newContent = ""
          this.newScore = 1
        })
    }

  },
  computed: {},

  watch: {},

  created: function () {
    // Vue 인스턴스가 생성되는 시점에 실행되는 함수입니다. 현재는 Vue 인스턴스가 생성되면, json-server 에서 장르목록만 받아옵니다.
      axios.get(`${HOST}/genres/`)  // 만약 json-server 를 사용하지 않거나 서버가 꺼져있다면 에러가 발생합니다.
        .then(res => this.genres = res.data)
      axios.get(`${HOST}/movies/`)
        .then(res => this.movies = res.data)
  }
});
