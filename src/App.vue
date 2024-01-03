<template>
  <div class="container">
    <h3 class="fs-3 text-center mt-4 mb-5 title-handler">
      Vazifalar Menedjeri
    </h3>
    <AddForm />
    <TodosList
      :todaysTodos="todaysTodos"
      :tomorrowsTodos="tomorrowsTodos"
      :thensTodos="thensTodos"
    />
    <TasksStatus
      :todaysTodos="todaysTodos"
      :tomorrowsTodos="tomorrowsTodos"
      :thensTodos="thensTodos"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { AddForm, TodosList, TasksStatus } from "./components";

export default {
  components: {
    AddForm,
    TodosList,
    TasksStatus,
  },
  computed: {
    ...mapState({
      todaysTodos: (state) => state.todaysTodos,
      tomorrowsTodos: (state) => state.tomorrowsTodos,
      thensTodos: (state) => state.thensTodos,
    }),
  },
};
</script>

<style>
.title-handler {
  font-weight: 700;
}
</style>
