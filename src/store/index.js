import { createStore } from "vuex";

const store = createStore({
  state: {
    todaysTodos: [],
    tomorrowsTodos: [],
    thensTodos: [],
  },
  mutations: {
    // add todos
    addTodoToday(state, payload) {
      state.todaysTodos.push(payload);
    },
    addTodoTomorrow(state, payload) {
      state.tomorrowsTodos.push(payload);
    },
    addTodoThen(state, payload) {
      state.thensTodos.push(payload);
    },

    // update completed
    setTodoToday(state, payload) {
      state.todaysTodos.map((todo) => {
        if (todo.completed === false && todo.id === payload.id) {
          state.todaysTodos = state.todaysTodos.filter(
            (item) => item.id !== payload.id
          );
          state.todaysTodos.push({ ...payload, completed: true });
        } else if (todo.completed === true && todo.id === payload.id) {
          state.todaysTodos = state.todaysTodos.filter(
            (item) => item.id !== payload.id
          );
          state.todaysTodos.unshift({ ...payload, completed: false });
        }
      });
    },
    setTodoTomorrow(state, payload) {
      state.tomorrowsTodos.map((todo) => {
        if (todo.completed === false && todo.id === payload.id) {
          state.tomorrowsTodos = state.tomorrowsTodos.filter(
            (item) => item.id !== payload.id
          );
          state.tomorrowsTodos.push({ ...payload, completed: true });
        } else if (todo.completed === true && todo.id === payload.id) {
          state.tomorrowsTodos = state.tomorrowsTodos.filter(
            (item) => item.id !== payload.id
          );
          state.tomorrowsTodos.unshift({ ...payload, completed: false });
        }
      });
    },
    setTodoThen(state, payload) {
      state.thensTodos.map((todo) => {
        if (todo.completed === false && todo.id === payload.id) {
          state.thensTodos = state.thensTodos.filter(
            (item) => item.id !== payload.id
          );
          state.thensTodos.push({ ...payload, completed: true });
        } else if (todo.completed === true && todo.id === payload.id) {
          state.thensTodos = state.thensTodos.filter(
            (item) => item.id !== payload.id
          );
          state.thensTodos.unshift({ ...payload, completed: false });
        }
      });
    },
  },
  actions: {
    // add tasks
    todaysTodos(context, newTodo) {
      context.commit("addTodoToday", newTodo);
    },
    tomorrowsTodos(context, newTodo) {
      context.commit("addTodoTomorrow", newTodo);
    },
    thensTodos(context, newTodo) {
      context.commit("addTodoThen", newTodo);
    },

    // update completed
    updateTodaysTodo(context, todo) {
      context.commit("setTodoToday", todo);
    },
    updateTomorrowsTodo(context, todo) {
      context.commit("setTodoTomorrow", todo);
    },
    updateThenTodo(context, todo) {
      context.commit("setTodoThen", todo);
    },
  },
});

export default store;
