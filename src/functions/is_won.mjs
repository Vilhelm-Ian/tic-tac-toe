function are_all_three_the_same(array) {
    if(array.includes(" ")) return false
    for(let i = 1; i < array.length; i++) {
        if(array[i-1]!==array[i]) return false
    } 
    return true
}

function convert_vertical_to_horizontal(two_dimensional_array) {
    let result = []
    for (let i = 0; i < two_dimensional_array[0].length; i++) {
        for (let z = 0; z < two_dimensional_array.length; z++) {
            if (result[i] == undefined) result.push([])
            result[i].push(two_dimensional_array[z][i])
        }
    }
    return result
}

function find_left_diagonal(two_dimensional_array) {
    let result = []
    for (let i = 0; i < two_dimensional_array.length; i++) {
        result.push(two_dimensional_array[i][i])
    }
    return result
}

function find_right_diagonal(two_dimensional_array) {
    let result = []
    for (let [i, z] = [0, 2]; i < two_dimensional_array.length; i++, z--) {
        result.push(two_dimensional_array[i][z])
    }
    return result
}

function is_horizontal_solved(two_dimensional_array) {
    return !!two_dimensional_array.filter(array => are_all_three_the_same(array)).length
}


function is_it_solved(two_dimensional_array) {
    let converted_horizontal_from_vertical = convert_vertical_to_horizontal(two_dimensional_array)
    let [left_diagonal, right_diagonal] = [find_left_diagonal(two_dimensional_array), find_right_diagonal(two_dimensional_array)]
    return is_horizontal_solved([...converted_horizontal_from_vertical, ...two_dimensional_array, left_diagonal, right_diagonal])
}

 
export {
    are_all_three_the_same,
    convert_vertical_to_horizontal,
    find_left_diagonal,
    find_right_diagonal,
    is_horizontal_solved,
    is_it_solved
}
