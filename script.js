const buttonsContainer = document.querySelector(".input-buttons");
const operation = document.querySelector("#operation");
const result = document.querySelector(".result");

result.textContent = "0";

buttonsContainer.addEventListener("click", (e) => {
    if (!e.target.classList.contains("button")) return;

    const btn = e.target;
    const value = btn.textContent;

    // All clear button
    if (btn.classList.contains("ac-button")) {
        result.textContent = "0";
        operation.textContent = "";
        return;
    }

    // numbers buttons
    if (btn.classList.contains("number")) {
        operation.textContent += value;
        operation.scrollLeft = operation.scrollWidth;
        return;
    }

    // operators buttons
    if (btn.classList.contains("operator")) {
        // prevent cases like 5****2+1 (operators repetaion)
        const lastChar = operation.textContent.at(-1);
        if (!["+","-","%","÷","×"].includes(lastChar)) {
            operation.textContent += value;
        }
        operation.scrollLeft = operation.scrollWidth;
        return;
    }

    // target point for float numbers
    if (btn.classList.contains("dot-button")) {
        operation.textContent += value;
        operation.scrollLeft = operation.scrollWidth;
    }

    // Delete last input number Or operator
    if (btn.classList.contains("delete-button")) {

        operation.textContent = operation.textContent.slice(0, -1);
        operation.scrollLeft = operation.scrollWidth;
        return;
    }

    if (value === "=") {
        let finalOperation = operation.textContent
            .replaceAll("÷", "/")
            .replaceAll("×", "*");

        try {
            const calc = eval(finalOperation);
            const rounded = Math.round(calc * 1e7) / 1e7;
            result.textContent = rounded;
        } catch {
            result.textContent = "Error";
        }
        result.scrollLeft = result.scrollWidth;
        return;
    }
});
