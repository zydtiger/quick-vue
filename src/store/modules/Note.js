if (localStorage.getItem('notes') == null) localStorage.setItem('notes', JSON.stringify([]))

/*
note
{
  // inherent
  title: string
  date: string
  content: string

  // added on
  id: number
}
*/

import '@/utils/date';

const state = {
  notes: JSON.parse(localStorage.getItem('notes'))
}

function SET_IDS(state) {
  console.info('Setting IDS')
  state.notes.forEach((note, i) => note.id = i);
}

function SAVE(state) {
  localStorage.setItem('notes', JSON.stringify(state.notes))
}

const mutations = {
  MODIFY_NOTE(state, { id, title, content }) {
    state.notes[id].title = title;
    state.notes[id].content = content;
    SAVE(state);
  },
  DEL_NOTE(state, id) {
    state.notes.splice(id, 1)
    SET_IDS(state)
    SAVE(state)
  },
  NEW_NOTE(state) {
    state.notes.unshift({
      title: "",
      content: "",
      date: new Date().toString(),
    })
    SET_IDS(state)
    SAVE(state)
  },
}

SET_IDS(state);

export default {
  state,
  mutations,
}