#&quot;jQuery.flickable.gallery&quot; jQuery plugin

##Description
このスクリプトはjQuery.flickable ( http://lagoscript.org/jquery/flickable )というプラグインを画像ギャラリー用に拡張したスクリプトです。

---
##Required
###jQuery 1.5.x
http://docs.jquery.com/Downloading_jQuery#Past_Releases
###jQuery.flickable
http://lagoscript.org/jquery/flickable

**※jQuery.flickableはjQuery 1.6.xでは正常に動作しないことが確認されています。
jQuery 1.5.xをお使いいただく必要があります。**

---
##Demos
http://kaelab.ranadesign.com/blog/demo/jquery-flickable-gallery/

---
##Usage

###Step01
head要素内で jquery.js、jquery.flickable.min.js、jquery.flickable.gallery.jsを順番に読み込みます。また、jquery.flickable.gallery.cssも必要に応じて読み込みましょう。

	<script type="text/javascript" src="jquery.js"></script>
	<script type="text/javascript" src="jquery.flickable.min.js"></script>
	<script type="text/javascript" src="jquery.flickable.gallery.js"></script>
	<link rel="stylesheet" type="text/css" href="jquery.flickable.gallery.css" />

###Step02
Step01の通りスクリプトファイルを読み込んだ後に、以下の例のように実行します。
ギャラリーのコンテナとなる要素をjQueryセレクタで指定して、実行します。引数でオプションを指定できます。

	<script type="text/javascript">
	$(function() {
		$('#gallery1').flickableGallery({
			// some options...
			width: 300,
			timerInterval: 5000,
			flickCancel: 'img'
		});
	});
	</script>
	...
	<div id="twTicker"></div>

オプションの一覧は次の表の通りです。

<table border="1">
<colgroup span="1" class="colh">
<colgroup span="1" class="colh">
<colgroup span="1" class="cold">
<thead>
<tr>
<th>オプション名<br>(option name)</th>
<th>デフォルト値<br>(default value)</th>
<th>備考<br>(note)</th>
</tr>
</thead>
<tbody>
<tr>
<td>width</td>
<td>null</td>
<td>画像ギャラリーの幅。単位はピクセル。1つの画像の横幅と同じ値を指定する。コンテナとなる要素の幅がこの値で制限されるため、 <strong>CSSでの指定がない場合は必須項目</strong><br>
例: 300</td>
</tr>
<tr>
<td>timerInterval</td>
<td>3000</td>
<td>ギャラリーが自動で切り替わる間隔をミリ秒で指定。0を指定すると自動で切り替わらなくなる</td>
</tr>
<tr>
<td>flickCancel</td>
<td>''</td>
<td>指定したセレクターにマッチした要素上でのフリック操作をキャンセルする<br>
<a href="http://lagoscript.org/jquery/flickable/documentation">jQuery.flickableの&quot;cancel&quot;オプション</a>に渡される。<br>
画像をフリック不可にする例: 'img'</td>
</tr>
</tbody>
</table>

---
##License
<a href="http://www.opensource.org/licenses/mit-license.html">MIT License</a><br />
参考: <a href="https://secure.wikimedia.org/wikipedia/ja/wiki/MIT_License">MIT License - Wikipedia</a>

---
##Contact
<a href="http://kaelab.ranadesign.com/blog/author/naoki-sekiguchi/">Naoki Sekiguchi - かえラボBlog</a>

---
##Note
本プロジェクトに含まれるjquery.flickable.min.jsのライセンスは<a href="http://lagoscript.org/jquery/flickable">オリジナルプロジェクト</a>のライセンスに帰属します。

