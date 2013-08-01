sickle [![Build Status](https://travis-ci.org/mzabriskie/sickle.png?branch=master)](https://travis-ci.org/mzabriskie/sickle)
======

Improves MooTools' performance by using Sizzle instead of Slick

## Benchmarks

These are the results of running the speed test found under <code>test/speed.html</code>.

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
			<td>7ms</td>
			<td>1ms</td>
		</tr>
		<tr>
			<td>Firefox</td>
			<td>6ms</td>
			<td>2ms</td>
		</tr>
		<tr>
			<td>Safari</td>
			<td>5ms</td>
			<td>3ms</td>
		</tr>
		<tr>
			<td>Opera</td>
			<td>8ms</td>
			<td>2ms</td>
		</tr>
		<tr>
			<td>IE10</td>
			<td>12ms</td>
			<td>7ms</td>
		</tr>
		<tr>
			<td>IE9</td>
			<td>10ms</td>
			<td>6ms</td>
		</tr>
		<tr>
			<td>IE8</td>
			<td>22ms</td>
			<td>17ms</td>
		</tr>
		<tr>
			<td>IE7</td>
			<td>26ms</td>
			<td>20ms</td>
		</tr>
	</tbody>
</table>

## Installing

- Download [Sizzle](http://sizzlejs.com)
- Download [Sickle](https://raw.github.com/mzabriskie/sickle/master/dist/sickle.js) or [Sickle minified](https://raw.github.com/mzabriskie/sickle/master/dist/sickle.min.js)
- Include them immediately after you include [MooTools](http://mootools.net)

```html
<script src="js/mootools.js"></script>
<script src="js/sizzle.js"></script>
<script src="js/sickle.js"></script>
```

No further code changes are required. Sickle overrides the MooTools methods that tie into Slick. This allows the API to remain the same, only what's happening under the hood changes.

## Testing

First you will need to clone a copy of the Sickle repository:

```bash
git clone https://github.com/mzabriskie/sickle.git
```

From the sickle directory install the Node dependencies:

```bash
cd sickle && npm install
```

Open <code>test/qunit.html</code> in the browser to run QUnit tests or run the following command:

```bash
grunt qunit
```

Open <code>test/speed.html</code> in the browser to run speed tests.

## License

Sickle is released under the MIT license.