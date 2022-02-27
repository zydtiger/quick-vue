<template>
  <transition name="slide-left" v-show="menuPresent">
    <div id="menu-wrapper">
      <div class="search-wrapper">
        <div class="toggle-search">
          <h1>Notes</h1>
          <div class="function-btn" id="toggle-search-btn" @click="toggleSearch">
            <div>
              <fa-icon :icon="['fas', 'search']" v-if="!searchToggled" />
              <fa-icon :icon="['fas', 'xmark']" v-if="searchToggled" />
            </div>
          </div>
        </div>
        <transition name="pop">
          <div class="search" v-show="searchToggled">
            <input type="text" v-model="searchTag" ref="searchInput" />
            <div>
              <fa-icon :icon="['fas', 'search']" />
            </div>
          </div>
        </transition>
        <div class="back" @click="toggleSearch" v-show="searchToggled"></div>
      </div>

      <div class="hr"></div>

      <div id="menu">
        <ul>
          <li
            v-for="(note, i) in filteredNotes"
            @click="chgNote(note.id)"
            :class="{ active: note.id == curId, btn: true }"
            :key="i"
          >
            <h4 v-html="note.title || 'New Note'"></h4>
            <div class="date">{{ note.date }}</div>
            <div class="summary">{{ parseHTML(note.content) || 'Type Something' }}</div>
          </li>
        </ul>
      </div>

      <div class="footer">
        <div class="footer-btn" title="Adds a new note" @click="newNote">
          <div style="font-size: 24px">+</div>
        </div>

        <div class="footer-btn" title="Deletes a note" @click="delNote">
          <fa-icon :icon="['fas', 'trash-can']" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import parseHTML from "@/utils/parseHTML";
import bus from "@/utils/bus";

export default {
  name: "left-menu-bar",
  data() {
    return {
      menuPresent: true,
      curId: 0,
      searchToggled: false,
      searchTag: "",
    };
  },
  mounted() {
    if (this.Note.notes.length == 0) this.newNote();

    bus.on("toggleMenu", () => {
      this.menuPresent = !this.menuPresent;
    });
    console.log("init note");
    bus.on("getInit", () => {
      this.chgNote(0);
    });
    bus.on("confirmDel", () => {
      this.DEL_NOTE(this.curId);
      if (this.Note.notes.length == 0) this.newNote()
      if (this.curId > 0) this.chgNote(this.curId-1)
      else this.chgNote(0)
    });
  },
  methods: {
    toggleSearch() {
      this.searchToggled = !this.searchToggled;
      if (this.searchToggled) setTimeout(() => this.$refs.searchInput.focus(), 300);
      else this.searchTag = "";
    },
    newNote() {
      this.NEW_NOTE();
      this.chgNote(0);
    },
    chgNote(id) {
      this.curId = id;
      bus.emit("chgNote", id);
    },
    delNote() {
      bus.emit("delNote");
    },
    parseHTML,
    ...mapMutations(["NEW_NOTE", "DEL_NOTE"]),
  },
  computed: {
    filteredNotes() {
      let tmp = this.Note.notes.filter(
        (note) =>
          note.content.includes(this.searchTag) || note.title.includes(this.searchTag)
      );
      return tmp;
    },
    ...mapState(["Note"]),
  },
};
</script>

<style lang="scss" scoped>
@import "@/theme.scss";

$titleHeight: 80px;

#menu-wrapper {
  position: fixed;
  margin: 0;
  width: $menuWidth;
  height: 100vh;
  background-color: $darkBgc;
  border-right: 1px solid $borderColor;
  transition: $menuAniTime ease-out;
  user-select: none;
  box-sizing: border-box;
  z-index: 1;

  .search-wrapper {
    overflow: hidden;
    transition: 1s ease-in-out;

    .toggle-search {
      h1 {
        margin: 0;
        background-color: transparent;
        padding: 20px 0 0 20px;
        font-weight: normal;
      }

      #toggle-search-btn {
        position: absolute;
        right: 20px;
        top: 20px;
      }
    }

    .search {
      position: absolute;
      margin: 5px 10px;
      padding: 8px;
      height: calc(25px + 2 * 8px);
      box-sizing: border-box;
      border-radius: 5px;
      background-color: $darkBgc;
      box-shadow: 1px 1px 8px -1px black;
      z-index: 20;

      input {
        width: 100%;
        padding-right: 20px;

        &:focus {
          border: 1px solid rgb(70, 146, 218);
          box-shadow: 0 0 2px 0 rgb(70, 146, 218);
        }
      }

      div {
        color: $borderColor;
        float: right;
        position: relative;
        top: -20px;
        right: 5px;
      }
    }
  }

  div.hr {
    width: calc(100% - 20px);
    margin: 10px 10px;
    margin-bottom: 5px;
  }

  #menu {
    width: 100%;
    height: calc(100vh - #{$titleHeight + $footerHeight});
    overflow-y: scroll;

    ul {
      list-style-type: none;
      padding: 0;
      margin: 10px 0;

      li {
        display: block;
        width: 100%;
        height: 90px;
        box-sizing: border-box;
        padding: 0 20px;
        transition: 0.1s ease-in-out;
        border-top: 1px solid $darkHover;
        color: black;

        &.active {
          background-color: $darkActive;
        }

        .date {
          margin-bottom: 5px;
          font-size: 10px;
        }

        h4 {
          margin-bottom: 5px;
          margin-top: 10px;
          font-weight: bold;

          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .summary {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          height: 40px;
        }
      }

      li:last-child {
        border-bottom: 1px solid $darkHover;
      }
    }
  }

  .footer {
    border-top: 1px solid $borderColor;
    background-color: $darkBgc;
    position: fixed;
    bottom: 0;
    width: $menuWidth;
    border-right: 1px solid $borderColor;
    box-sizing: border-box;
    height: $footerHeight;
    transition: $menuAniTime ease-out;
    display: flex;
    justify-content: space-between;

    %footer-btn {
      width: $footerHeight;
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    .footer-btn {
      @extend %btn-base;
      @extend %footer-btn;
    }
  }
}
</style>
