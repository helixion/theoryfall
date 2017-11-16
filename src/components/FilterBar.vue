<template>
  <div id="filter">
      <form>
          <div class="field-body">
              <div class="field">
                  <p class="control is-expanded">
                      <input type="text" class="input" placeholder="search...">
                  </p>
              </div>
              <div class="field is-narrow">
                  <div class="control">
                      <div class="select is-fullwidth">
                          <select>
                              <option>Filter by Tag</option>
                              <option>Filter by Power</option>
                          </select>
                      </div>
                  </div>
              </div>
          </div>
      </form>
  </div>
</template>


<style lang="scss">
#filter {
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    border: 1px #555;
    background-color: #232323;
}
</style>
