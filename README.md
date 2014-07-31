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

#### Bower

```bash
$ bower install mootools
$ bower install sizzle
$ bower install sickle
```

```html
<script src="bower_components/mootools/dist/mootools-core.min.js"></script>
<script src="bower_components/sizzle/dist/sizzle.min.js"></script>
<script src="bower_components/sickle/dist/sickle.min.js"></script>
```

#### Manually

- Download [Sizzle](http://sizzlejs.com)
- Download [Sickle](https://raw.github.com/mzabriskie/sickle/master/dist/sickle.js) or [Sickle minified](https://raw.github.com/mzabriskie/sickle/master/dist/sickle.min.js)
- Include them immediately after you include [MooTools](http://mootools.net)

```html
<script src="js/mootools.min.js"></script>
<script src="js/sizzle.min.js"></script>
<script src="js/sickle.min.js"></script>
```

No further code changes are required. Sickle overrides the MooTools methods that tie into Slick. This allows the API to remain the same, only what's happening under the hood changes.

## Building

First you will need to clone a copy of the Sickle repository:

```bash
$ git clone https://github.com/mzabriskie/sickle.git
```

From the sickle directory install the Node dependencies:

```bash
$ cd sickle && npm install
```

Run the following command to build the project:

```bash
$ grunt
```

This will run the tests and if they pass copy the built files to the <code>dist</code> directory.

## Testing

First clone the Sickle repository and install the Node dependencies (see the first two steps from Building above).

Open <code>test/qunit.html</code> in the browser to run QUnit tests or run the following command:

```bash
$ grunt qunit
```

Open <code>test/speed.html</code> in the browser to run speed tests.

## Issues

If you think you've found a bug please follow these steps:

1. Make sure the issue hasn't already been fixed by updating your code to use the latest release on master.
2. Check [existing issues](https://github.com/mzabriskie/sickle/issues) to see if it has already been logged by someone else.
3. [Create an issue](https://github.com/mzabriskie/sickle/issues/new) supplying a [JSFiddle](http://jsfiddle.net) or [JSBin](http://jsbin.com) demonstrating the issue that you have encountered.

## License

Sickle is released under the MIT license.