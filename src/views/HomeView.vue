<template>
  <div class="home">
    <left-menu-bar/>
    <right-content-area/>
    <del-popup/>
  </div>
</template>

<script>
// @ is an alias to /src
import LeftMenuBar from '@/components/HomeView/LeftMenuBar.vue'
import RightContentArea from '@/components/HomeView/RightContentArea.vue'
import DelPopup from '@/components/HomeView/DelPopup.vue';

export default {
  name: 'HomeView',
  components: {
    LeftMenuBar,
    RightContentArea,
    DelPopup,
  },
}
</script>
