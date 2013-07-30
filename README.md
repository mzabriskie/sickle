sickle
======

Improves MooTools' performance by using Sizzle instead of Slick

## Benchmarks

These are the results of running the speed test found under <em>test/speed.html</em> executing each query 100 times.

<table>
	<thead>
		<tr>
			<th>Browser</th>
			<th>Slick</th>
			<th>Sickle</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Chrome</td>
			<td>55ms</td>
			<td style="background:#ccffcc;">30ms</td>
		</tr>
		<tr>
			<td>Firefox</td>
			<td>93ms</td>
			<td style="background:#ccffcc;">42ms</td>
		</tr>
		<tr>
			<td>Safari</td>
			<td>41ms</td>
			<td style="background:#ccffcc;">28ms</td>
		</tr>
		<tr>
			<td>Opera</td>
			<td>50ms</td>
			<td style="background:#ccffcc;">30ms</td>
		</tr>
		<tr>
			<td>IE10</td>
			<td>93ms</td>
			<td style="background:#ccffcc;">30ms</td>
		</tr>
		<tr>
			<td>IE9</td>
			<td>96ms</td>
			<td style="background:#ccffcc;">54ms</td>
		</tr>
		<tr>
			<td>IE8</td>
			<td>300ms</td>
			<td style="background:#ffcccc;">381ms</td>
		</tr>
		<tr>
			<td>IE7</td>
			<td>308ms</td>
			<td style="background:#ffcccc;">364ms</td>
		</tr>
	</tbody>
</table>

There are still some optimizations to be made for older versions of IE. Although when the speed test is run executing each query once the speed is comparable. Since a single selector query isn't typically executed hundreds of times back to back in a production environment this is acceptable.

## Installing

- Download [Sizzle](http://sizzlejs.com)
- Download either [Sickle](https://raw.github.com/mzabriskie/sickle/master/dist/sickle.js) or [Sickle minified](https://raw.github.com/mzabriskie/sickle/master/dist/sickle.min.js)
- Include them immediately after you include [MooTools](http://mootools.net)

```html
<script src="js/mootools.js"></script>
<script src="js/sizzle.js"></script>
<script src="js/sickle.js"></script>
```

## License

Sickle is released under the MIT license.