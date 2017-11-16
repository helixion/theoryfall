<template>
  <nav class="pagination" role="navigation" aria-label="pagination">
      <a class="pagination-previous">Previous</a>
      <a class="pagination-next">Next Page</a>
      <div class="limit control">
        <div class="select is-narrow">
            <select>
                <option>Limit (default: 20 per page)</option>
                <option>50 per page</option>
                <option>All</option>
            </select>
        </div>
      </div>
      <ul class="pagination-list">
        <li v-for="n in meta.totalPages" :key="n">
            <a href="" class="pagination-link">{{n}}</a>
        </li>
      </ul>
  </nav>
</template>

<script>
export default {
  props: {
      meta: {
          type: Object,
          required: true
      }
  }
}
</script>



<style lang="scss">
.limit {
    order: 3;
}
</style>
