
<script setup>
import * as d3 from "d3";
import { onMounted, onUpdated, watchEffect } from 'vue';

const props = defineProps(['id', 'v', 'data'])
const width = 800;
const height = 400;

console.log("data in Chart", props.data)
onMounted(() => {
    const svgId = "#svg-"+props.id;
    const svg = d3.select(svgId).attr("width", width).attr("height", height);
    const g = svg.append("g");

    //2. Parse the dates
    const parseTime = d3.timeParse("%d-%b-%y");

    //3. Creating the Chart Axes
    const x = d3
        .scaleTime()
        .domain(
            d3.extent(props.data, function (d) {
                return parseTime(d.date);
            })
        )
        .rangeRound([0, width]);

    const y = d3
        .scaleLinear()
        .domain(
            d3.extent(props.data, function (d) {
                return d.amount;
            })
        )
        .rangeRound([height, 0]);

    //4. Creating a Line
    const line = d3
        .line()
        .x(function (d) {
            return x(parseTime(d.date));
        })
        .y(function (d) {
            return y(d.amount);
        });

    //5. Appending the Axes to the Chart
    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Price ($)");

    //6. Appending a path to the Chart
    g.append("path")
        .datum(props.data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);
})
onUpdated(() => {
    const svgId = "#svg-"+props.id;
    const a = d3.select(svgId).select("g");
    a.remove();
    const svg = d3.select(svgId).attr("width", width).attr("height", height);
    const g = svg.append("g");

    //2. Parse the dates
    const parseTime = d3.timeParse("%d-%b-%y");

    //3. Creating the Chart Axes
    const x = d3
        .scaleTime()
        .domain(
            d3.extent(props.data, function (d) {
                return parseTime(d.date);
            })
        )
        .rangeRound([0, width]);

    const y = d3
        .scaleLinear()
        .domain(
            d3.extent(props.data, function (d) {
                return d.amount;
            })
        )
        .rangeRound([height, 0]);

    //4. Creating a Line
    const line = d3
        .line()
        .x(function (d) {
            return x(parseTime(d.date));
        })
        .y(function (d) {
            return y(d.amount);
        });

    //5. Appending the Axes to the Chart
    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Price ($)");

    //6. Appending a path to the Chart
    g.append("path")
        .datum(props.data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);
})
watchEffect(() => {
    console.log("updating?")
})
</script>
<template>
    <div v-if="props.data != 'undefined' && props.data != null">
        <svg :id="'svg-'+props.id" viewBox="0 0 960 500" preserveAspectRatio="xMidYMid meet"></svg>
    </div>
    <div v-else> No data for this variable</div>
</template>