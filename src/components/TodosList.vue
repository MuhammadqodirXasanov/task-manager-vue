<template>
  <!-- Today's Tasks -->
  <div class="pe-3">
    <div class="mt-5" v-if="todaysTodos.length">
      <h3 class="fw-bold mb-2">Bugun</h3>
      <ul class="list-handler">
        <li
          class="item-handler"
          v-for="todaysTodo in todaysTodos"
          :key="todaysTodo.id"
        >
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex gap-3 align-items-center">
              <input
                class="checkbox"
                type="checkbox"
                @click="$store.dispatch('updateTodaysTodo', todaysTodo)"
              />
              <p
                class="task-text"
                :class="[todaysTodo.completed && 'completed']"
              >
                {{ todaysTodo.task }}
              </p>
            </div>
            <p :class="[todaysTodo.completed && 'completed']">
              {{ todaysTodo.time }}
            </p>
          </div>
        </li>
      </ul>
    </div>

    <!-- Tomorrow's Tasks -->
    <div class="mt-5" v-if="tomorrowsTodos.length">
      <h3 class="fw-bold mb-2">Ertaga</h3>
      <ul class="list-handler">
        <li
          class="item-handler"
          v-for="tomorrowsTodo in tomorrowsTodos"
          :key="tomorrowsTodo.id"
        >
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex gap-3 align-items-center">
              <input
                class="checkbox"
                type="checkbox"
                @click="$store.dispatch('updateTomorrowsTodo', tomorrowsTodo)"
              />
              <p :class="[tomorrowsTodo.completed && 'completed']">
                {{ tomorrowsTodo.task }}
              </p>
            </div>
            <p :class="[tomorrowsTodo.completed && 'completed']">
              {{ tomorrowsTodo.time }}
            </p>
          </div>
        </li>
      </ul>
    </div>

    <!-- Then's Tasks -->
    <div class="mt-5" v-if="thensTodos.length">
      <h3 class="fw-bold mb-2">Keyin</h3>
      <ul class="list-handler">
        <li
          class="item-handler"
          v-for="thensTodo in thensTodos"
          :key="thensTodo.id"
        >
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex gap-3 align-items-center">
              <input
                class="checkbox"
                type="checkbox"
                @click="$store.dispatch('updateThenTodo', thensTodo)"
              />
              <p :class="[thensTodo.completed && 'completed']">
                {{ thensTodo.task }}
              </p>
            </div>
            <p :class="[thensTodo.completed && 'completed']">
              {{ thensTodo.date + ", " + thensTodo.time }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todaysTodos: Array,
    tomorrowsTodos: Array,
    thensTodos: Array,
  },
};
</script>

<style>
.item-handler {
  margin-bottom: 1rem;
}
.checkbox {
  width: 25px;
  height: 25px;
  background: #f6f6f6;
  border: 3px solid #c5c5c5;
}
p {
  margin: 0;
}
.completed {
  opacity: 0.6;
  text-decoration: line-through;
}
.list-handler {
  padding-left: 10px;
}
</style>
