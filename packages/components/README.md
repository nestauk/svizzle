# Guidelines

## Font related CSS properties for accessibility

In Svizzle components we don't define font families nor absolute font sizes
because we prefer to let `A11yMenuDriver` to manage those.

Font sizes in CSS should be defined in `em` units because we're adopting the
convention of setting the main font size in the root element (`html`) and
adjusting the font size in the `body` element for purposes of accessibility.
