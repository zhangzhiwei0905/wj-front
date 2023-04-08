<template>
  <form @submit.p.prevent="onSubmit">
    <label for="new-todo-input">
      What needs to be done?
    </label>
    <input
      id="new-todo-input"
      v-model.trim.lazy="label"
      autocomplete="off"
      name="new-todo"
      type="text"
    />
    <button type="submit">
      Add
    </button>
  </form>
</template>

<script>
export default {
  name: 'ToDoForm',
  methods: {
    onSubmit () {
      if (this.label === '') {
        return
      }
      // 子组件发出一个自定义事件，父组件去接收
      this.$emit('todo-added', this.label)
      this.label = ''
    }
  },
  data () {
    return {
      label: ''
    }
  }
}
</script>

<style scoped>

</style>
