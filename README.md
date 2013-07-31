sickle [![Build Status](https://travis-ci.org/mzabriskie/sickle.png?branch=master)](https://travis-ci.org/mzabriskie/sickle)
======

Improves MooTools' performance by using Sizzle instead of Slick

## Benchmarks

These are the results of running the speed test found under <code>test/speed.html</code>.

<table>
	<thead>
		<tr>
			<th>&nbsp;</th>
			<th colspan="2">16 queries</th>
			<th colspan="2">1600 queries</th>
		</tr>
		<tr>
			<th>Browser</th>
			<th>Slick</th>
			<th>Sickle</th>
			<th>Slick</th>
			<th>Sickle</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Chrome</td>
			<td>7ms</td>
			<td>1ms</td>
			<td>55ms</td>
			<td>30ms</td>
		</tr>
		<tr>
			<td>Firefox</td>
			<td>6ms</td>
			<td>2ms</td>
			<td>93ms</td>
			<td>42ms</td>
		</tr>
		<tr>
			<td>Safari</td>
			<td>5ms</td>
			<td>3ms</td>
			<td>41ms</td>
			<td>28ms</td>
		</tr>
		<tr>
			<td>Opera</td>
			<td>8ms</td>
			<td>2ms</td>
			<td>50ms</td>
			<td>30ms</td>
		</tr>
		<tr>
			<td>IE10</td>
			<td>12ms</td>
			<td>7ms</td>
			<td>93ms</td>
			<td>30ms</td>
		</tr>
		<tr>
			<td>IE9</td>
			<td>10ms</td>
			<td>6ms</td>
			<td>96ms</td>
			<td>54ms</td>
		</tr>
		<tr>
			<td>IE8</td>
			<td>22ms</td>
			<td>17ms</td>
			<td>300ms</td>
			<td>381ms</td>
		</tr>
		<tr>
			<td>IE7</td>
			<td>26ms</td>
			<td>20ms</td>
			<td>308ms</td>
			<td>364ms</td>
		</tr>
	</tbody>
</table>

There are still some optimizations to be made for older versions of IE. Although when the speed test is run executing each query once the speed is an improvement. Since a single selector query isn't typically executed hundreds of times back to back in a production environment this is acceptable.

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
cd sickle
npm install
```

Open <code>test/qunit.html</code> in the browser to run QUnit tests or run the following command:

```bash
grunt qunit
```

Open <code>test/speed.html</code> in the browser to run speed tests.

## License

Sickle is released under the MIT license.