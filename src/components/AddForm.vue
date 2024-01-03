<template>
  <form @submit="submitForm" class="d-flex gap-4 align-items-start">
    <Input :class="[error && 'border-danger']" type="text" v-model="newTask" />
    <button class="btn btn-handler">+</button>
  </form>
  <p
    v-if="error"
    class="text-danger"
    style="
      font-size: 14px;
      padding-left: 5px;
      padding-top: 5px;
      font-weight: 500;
    "
  >
    Matn Kamida 3 harfdan iborat bo'lishi kerak!
  </p>
  <p class="current-date">Bugun: {{ now.slice(0, -3) }}</p>
</template>

<script>
import { nanoid } from "nanoid";

export default {
  data() {
    return {
      newTask: "",
      error: false,
      now: new Date().toLocaleString("uz"),
    };
  },
  methods: {
    // setting current date
    date() {
      const now = new Date();

      // get times
      const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
      const minute =
        now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
      const month =
        now.getMonth() + 1 < 10 ? "0" + now.getMonth() : now.getMonth();
      const day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
      const year = now.getFullYear();

      return {
        now,
        hour,
        minute,
        month,
        day,
        year,
      };
    },
    submitForm(e) {
      e.preventDefault();

      if (this.newTask.length <= 2) {
        this.error = true;

        return;
      }

      this.error = false;

      // get input dates
      const startDate = this.newTask.trim().substr(0, 10);
      const endDate = this.newTask.trim().substr(-10);
      const endHours = this.newTask.trim().slice(-5);
      const thenEndDate = this.newTask.trim().slice(-16, -6);

      // validate input dates and times
      const startDateSetting =
        (+startDate[0] === 0 || +startDate[0]) &&
        (+startDate[1] === 0 || +startDate[1]) &&
        (+startDate[3] === 0 || +startDate[3]) &&
        (+startDate[4] === 0 || +startDate[4]) &&
        (+startDate[6] === 0 || +startDate[6]) &&
        (+startDate[7] === 0 || +startDate[7]) &&
        (+startDate[8] === 0 || +startDate[8]) &&
        (+startDate[9] === 0 || +startDate[9]);

      const endDateSetting =
        (+endDate[0] === 0 || +endDate[0]) &&
        (+endDate[1] === 0 || +endDate[1]) &&
        (+endDate[3] === 0 || +endDate[3]) &&
        (+endDate[4] === 0 || +endDate[4]) &&
        (+endDate[6] === 0 || +endDate[6]) &&
        (+endDate[7] === 0 || +endDate[7]) &&
        (+endDate[8] === 0 || +endDate[8]) &&
        (+endDate[9] === 0 || +endDate[9]);

      const thenEndDateSettings =
        (+thenEndDate[0] === 0 || +thenEndDate[0]) &&
        (+thenEndDate[1] === 0 || +thenEndDate[1]) &&
        (+thenEndDate[3] === 0 || +thenEndDate[3]) &&
        (+thenEndDate[4] === 0 || +thenEndDate[4]) &&
        (+thenEndDate[6] === 0 || +thenEndDate[6]) &&
        (+thenEndDate[7] === 0 || +thenEndDate[7]) &&
        (+thenEndDate[8] === 0 || +thenEndDate[8]) &&
        (+thenEndDate[9] === 0 || +thenEndDate[9]);

      const endHoursSetting =
        (+endHours[0] === 0 || +endHours[0]) &&
        (+endHours[1] === 0 || +endHours[1]) &&
        (+endHours[3] === 0 || +endHours[3]) &&
        (+endHours[4] === 0 || +endHours[4]);

      // --------------------------------tomorrow's validation--------------------------------
      if (
        endHoursSetting &&
        this.newTask.trim().substr(0, 6).toLowerCase() === "ertaga"
      ) {
        this.$store.dispatch("tomorrowsTodos", {
          task: this.newTask.trim().slice(6, -5),
          id: nanoid(),
          completed: false,
          time: this.newTask.trim().slice(-5),
        });
      } else if (
        endHoursSetting &&
        this.newTask.trim().slice(-12, -6).toLowerCase() === "ertaga"
      ) {
        this.$store.dispatch("tomorrowsTodos", {
          task: this.newTask.trim().split(" ").slice(0, -2).join(" "),
          id: nanoid(),
          completed: false,
          time: this.newTask.trim().slice(-5),
        });
      } else if (
        this.newTask.trim().substr(0, 6).toLowerCase() === "ertaga" ||
        this.newTask.trim().substr(-6).toLowerCase() === "ertaga"
      ) {
        this.$store.dispatch("tomorrowsTodos", {
          task: this.newTask.trim().toLowerCase().replace("ertaga", ""),
          id: nanoid(),
          completed: false,
          time: Number(this.date().hour) + 1 + ":00",
        });
      }

      // --------------------------------then's validation--------------------------------
      else if (startDateSetting && endHoursSetting) {
        this.$store.dispatch("thensTodos", {
          task: this.newTask.trim().slice(10, -6),
          id: nanoid(),
          completed: false,
          time: this.newTask.trim().slice(-5),
          date: this.newTask.trim().slice(0, 10),
        });
      } else if (thenEndDateSettings && endHoursSetting) {
        this.$store.dispatch("thensTodos", {
          task: this.newTask.trim().split(" ").slice(0, -2).join(" "),
          id: nanoid(),
          completed: false,
          time: this.newTask.trim().slice(-5),
          date: this.newTask.trim().slice(-16, -6),
        });
      } else if (startDateSetting) {
        this.$store.dispatch("thensTodos", {
          task: this.newTask.trim().replace(startDate, ""),
          id: nanoid(),
          completed: false,
          time: Number(this.date().hour) + 1 + ":00",
          date: this.newTask.trim().slice(0, 10),
        });
      } else if (endDateSetting) {
        this.$store.dispatch("thensTodos", {
          task: this.newTask.trim().replace(endDate, ""),
          id: nanoid(),
          completed: false,
          time: Number(this.date().hour) + 1 + ":00",
          date: this.newTask.trim().slice(-10),
        });
      }

      // --------------------------------today's validation--------------------------------
      else if (
        endHoursSetting &&
        this.newTask.trim().substr(0, 5).toLowerCase() === "bugun"
      ) {
        this.$store.dispatch("todaysTodos", {
          task: this.newTask.trim().slice(5, -5),
          id: nanoid(),
          completed: false,
          time: this.newTask.trim().slice(-5),
        });
      } else if (
        endHoursSetting &&
        this.newTask.trim().slice(-11, -6).toLowerCase() === "bugun"
      ) {
        this.$store.dispatch("todaysTodos", {
          task: this.newTask.trim().split(" ").slice(0, -2).join(" "),
          id: nanoid(),
          completed: false,
          time: this.newTask.trim().slice(-5),
        });
      } else {
        this.$store.dispatch("todaysTodos", {
          task: this.newTask.trim().toLowerCase().replace("bugun", ""),
          id: nanoid(),
          completed: false,
          time: Number(this.date().hour) + 1 + ":00",
        });
      }

      this.newTask = "";
    },
  },
};
</script>

<style scoped>
.btn-handler {
  font-weight: 500;
  padding: 9px 15px;
  background-color: #89d7ad;
  border: 3px solid #51b07d;
}
.current-date {
  opacity: 60%;
  font-weight: 500;
  padding: 2px 6px;
}
</style>
