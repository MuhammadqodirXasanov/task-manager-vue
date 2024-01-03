<template>
  <div class="container position-absolute tasks-status__box">
    <p class="tasks-status">
      Bajarilganlar:
      {{
        todaysTodos.filter((todo) => todo.completed === true).length +
        tomorrowsTodos.filter((todo) => todo.completed === true).length +
        thensTodos.filter((todo) => todo.completed === true).length
      }}
    </p>
    <p class="tasks-status">
      Bajarilmaganlar:
      {{
        todaysTodos.filter((todo) => todo.completed === false).length +
        tomorrowsTodos.filter((todo) => todo.completed === false).length +
        thensTodos.filter((todo) => todo.completed === false).length
      }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      completed: 0,
      unCompleted: 0,
    };
  },
  props: {
    todaysTodos: Array,
    tomorrowsTodos: Array,
    thensTodos: Array,
  },
};
</script>

<style>
.tasks-status__box {
  text-align: right;
  margin-top: 40px;
  padding-bottom: 15px;
}
.tasks-status {
  opacity: 0.6;
  font-size: 14px;
}
</style>
