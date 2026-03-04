<script setup>
import {useFetch} from '../common/fetch.js'

const {data,error}=useFetch('https://jsonplaceholder.typicode.com/todos/1')
</script>