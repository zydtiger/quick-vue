<template>
  <div id="popup-wrapper">
    <transition name="pop">
      <div id="pop" v-show="active">
        <h2>Confirm Deletion</h2>
        <h4>Do you confirm deletion?</h4>
        <div class="btn-group">
          <div class="popup-btn" @click="confirmDel">
            <div>Confirm</div>
          </div>
          <div class="popup-btn" @click="active = false">
            <div>Cancel</div>
          </div>
        </div>
      </div>
    </transition>
    <div class="back" v-show="active" @click="active = false"></div>
  </div>
</template>

<script>
import bus from "@/utils/bus";

export default {
  name: "del-popup",
  data() {
    return {
      active: false,
    };
  },
  methods: {
    confirmDel() {
      bus.emit("confirmDel");
      this.active = false;
    },
  },
  mounted() {
    bus.on("delNote", () => {
      this.active = true;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/theme.scss";

#pop {
  z-index: 20;

  position: absolute;
  left: calc(50% - 500px / 2);
  top: calc(40% - 200px / 2);

  width: 500px;
  height: 200px;
  border-radius: 10px;

  background-color: $lightBgc;
  box-shadow: 3px 3px 20px -5px black;

  .btn-group {
    margin-top: 23px;
    margin-left: calc(100% - 200px);
    display: flex;
    justify-content: space-between;
    width: 180px;
  }
}

h2,
h4 {
  padding: 15px;
  font-weight: lighter;
  border-bottom: 1px solid $borderColor;
}

h4 {
  padding: 20px 15px;
}

.popup-btn {
  @extend %btn-base;
  @extend %function-btn-base;

  width: 80px;
  height: 30px;
}
</style>
