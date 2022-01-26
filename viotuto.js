Vue.component('hijo', {
    data: function(){
        return {
            cur : ""
        }
    },

    template: 
    ` 
    <div >
    <nav class="navbar navbar-light bg-light justify-content-between"style="padding:0.3em 1em 1em;">
    <a class="navbar-brand">{{title}}</a>
    <div class="d-flex">
    <input class="form-control mr-sm-2" type="search"  v-model="cur" v-on:keyup.enter="obtener(cur)" placeholder="Search" aria-label="Search">
    <button class="btn btn-outline-success my-2 my-sm-0" @click="obtener(cur)" type="submit">Search</button>
    </div >
    </nav>
    <div  class="d-flex justify-content-around flex-wrap">
    <div v-for="item of canciones" class="card" style="width: 18rem;">
    <img v-bind:src="item.album.cover" class="card-img-top">
    <div class="card-body bg-dark">
    <audio  style="width: 15rem;  height: 2em" controls>
    <source  v-bind:src="item.preview" type="audio/mpeg">
    </audio>
    </div>
    </div>
    </div>
    </div>
    `,
    computed:{
        ...Vuex.mapState(['title','canciones'])
    },
    methods: {
        ...Vuex.mapActions(['obtener'])
    }

});

const store = new Vuex.Store({
    state:{
        title : "Buscador de musica",
        canciones: [],
    },
    mutations:{
        llenarCursos(state, cancionesA){
            state.canciones = cancionesA.data
        }
    },
    actions:{
        obtener: async function({commit},mius){
            try {
                const data = await fetch('https://api.deezer.com/search?q='+mius)
                const canciones = await data.json()
                commit('llenarCursos', canciones)
            } catch (error) {
                console.log(error)
            }
            
        }
    }
});
const app = new Vue({
    el:'#app',
    store : store
});
