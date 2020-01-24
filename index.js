var countdown = new Vue({
  el: "#countdown",
  data: {
    text: ''
  }
}
)

var full_name = new Vue({
  el: "#full_name",
  data: {
    text: ''
  }
}
)

var profession = new Vue({
  el: "#profession",
  data: {
    text: ''
  }
}
)

Vue.component('candidate-item', {
  props: ['candidate'],
  template: '<li>{{ candidate.name + " " + candidate.time }} <button v-on:click="speak(candidate.id)" :id="candidate.id">Give a word</button></li>',
  methods: {
    speak: function (id) {
      if (candidates.candidates[id].speaking == true) {
        alert('This person is already speaking!')
        return false
      }
      time = candidates.candidates[id].time
      cand = candidates.candidates[id]
      this.stopOthers(cand)
      cand.speaking = true

      this.countDownTimer(cand)
    },
    countDownTimer(cand) {
      if(cand.time > 0 && cand.speaking == true)  {
        setTimeout(() => {
          cand.time -= 1
          countdown.text = new Date(cand.time * 1000).toISOString().substr(11, 8).slice(3)
          full_name.text = cand.name
          profession.text = cand.profession
          this.countDownTimer(cand)
        }, 1000)
      }
      if(cand.time <= 0) {
        alert('That is all for you')
      }
    },
    stopOthers(cand) {
      candidates.candidates.filter(e => e.id != cand.id).map(e => e.speaking = false)
      countdown.text = ''
      full_name.text = ''
      profession.text = ''
    },

  }
})

var candidates = new Vue({
  el: '#candidates',
  data: {
    candidates: [
      { id: 0, name: 'Нельсон По',        time: 10,  speaking: false, profession: 'политик'},
      { id: 1, name: 'Алена Позднякова',  time: 200, speaking: false, profession: 'актриса'},
      { id: 2, name: 'Виктор Санин',      time: 300, speaking: false, profession: 'врач-гинеколог'},
      { id: 3, name: 'Стоян Стоянов',     time: 180, speaking: false, profession: 'видеоблогер'},
    ]
  },
  methods: {
    stopAll() {
      candidates.candidates.map(e => e.speaking = false)
      countdown.text = ''
      full_name.text = ''
      profession.text = ''
    }
  }
})
