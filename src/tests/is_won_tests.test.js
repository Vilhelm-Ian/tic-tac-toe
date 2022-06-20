import {
    are_all_three_the_same,
    convert_vertical_to_horizontal,
    find_left_diagonal,
    find_right_diagonal,
    is_it_solved,
    is_horizontal_solved
} from "../is_won.js"


it("all_three_are_the_same", () => {
    expect(are_all_three_the_same(["X", "X", "X"])).toBe(true)
})

it("all_three_are_not_the_same", () => {
    expect(are_all_three_the_same(["X", "O", "X"])).toBe(false)
})


it("array is not filled", () => {
    expect(are_all_three_the_same(["X", " ", "X"])).toBe(false)
})

it("find first row", () => {
    expect(convert_vertical_to_horizontal([
        ["X", " ", " "],
        ["X", " ", " "],
        ["X", " ", " "]
    ])[0]).toStrictEqual(["X", "X", "X"])
})

it("first_row_the_same", () => {
    expect(are_all_three_the_same(convert_vertical_to_horizontal([
        ["X", " ", " "],
        ["X", " ", " "],
        ["X", " ", " "],
    ])[0])).toBe(true)
})


it("left_diagonal", () => {
    expect(find_left_diagonal([
        ["X", " ", " "],
        [" ", "X", " "],
        [" ", " ", "X"],
    ])).toStrictEqual(["X", "X", "X"])
})


it("right_diagonal", () => {
    expect(find_right_diagonal([
        [" ", " ", "X"],
        [" ", "X", " "],
        ["X", " ", " "],
    ])).toStrictEqual(["X", "X", "X"])
})

it("horizonatl", () => {
    expect(is_horizontal_solved([
        ["X", "X", "X"],
        [" ", " ", " "],
        [" ", " ", " "],
    ])).toBe(true)
})

it("it's solved", () => {
    expect(is_it_solved([
        [" ", " ", "X"],
        [" ", "X", " "],
        ["X", " ", " "],
    ])).toBe(true)
})


it("it's not won", () => {
    expect(is_it_solved([
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ],"O")).toBe(false)
})

it("it's not won'", () => {
expect(is_it_solved([
["X", "X", " "],
["O", "O", " "],
[" ", " ", "X"],
])).toBe(false)
})

it("it's over now'", () => {
expect(is_it_solved([
["X", "O", " "],
["X", "O", " "],
["X", " ", "O"]
])).toBe(true)
})
