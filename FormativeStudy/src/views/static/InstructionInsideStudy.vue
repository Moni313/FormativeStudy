<template>
    <article>
        <h4 class="text-center">Instrunctions</h4>
        <p>You are asked to assess whether the patient has sepsis or is at risk of developing sepsis</p>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <b>Select</b> variable(s) from Vital Signs, Labs, Medication buttons.
            </li>
            <li class="list-group-item">
                <b>Look</b> at the graphics by selecting a variable from the "Variables Selected" list
            </li>
            <li class="list-group-item">
                If you believe this case corresponds to<b> sepsis or not</b>, please click the appropriate button located in the blue rectangle "Is this Sepsis". <b>Please provide your response at the earliest possible timeslot and try to avoid waiting until the last one</b>.
            </li>
            <li class="list-group-item">
                If you are unsure or undecided, additional information can be provided:
                <ul>
                    <li>proceed to the <b>next timeslot</b>, by clicking on <button class="btn btn-success text-center" disabled><b class="h6"><i class="bi bi-chevron-double-right"></i></b></button><br /> Note that this will update the graphics for all the selected variables to the new timeslot. This action cannot be undone.</li>
                    <li><b>select other variable(s)</b>, or </li>
                    <li><b>Compare</b> two variables. While examining the graphics for a particular variable, a "Compare" button will appear, allowing you to compare two variables. By clicking the "Compare" button, you can select a second variable to view and compare its corresponding graphics alongside the initial variable. This feature enables you to analyze and compare the trends and patterns of two variables simultaneously.</li>
                </ul>

            </li>
        </ul>
    </article>
</template>