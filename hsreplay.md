---
layout: page
title: HSReplay - Hearthstone Replays
permalink: /hsreplay/
---

**HSReplay** is a specification for Hearthstone replays.

The primary user of the HSReplay spec is [HSReplay.net](https://hsreplay.net),
which uses [Joust](/joust) to make replays available on the web.


## Useful links

* [HSReplay 1.7 DTD](https://hearthsim.info/hsreplay/dtd/hsreplay-1.7.dtd)
* [HSReplay development repository](https://github.com/HearthSim/HSReplay)
* [HSReplay Python library](https://github.com/HearthSim/python-hsreplay)
* [HSReplay XML viewer: Joust](https://github.com/HearthSim/Joust)
* [Gamestate Protocol documentation](/docs/gamestate-protocol/)


## Example replay

Here follows a short two-turn example game converted to HSReplay:

```xml
<?xml version="1.0" ?>
<!DOCTYPE hsreplay SYSTEM "https://hearthsim.info/hsreplay/dtd/hsreplay-1.3.dtd">
<HSReplay version="1.3">
	<Game ts="18:57:36.505394">
		<GameEntity id="1">
			<Tag tag="20" value="1"/>
			<Tag tag="49" value="1"/>
			<Tag tag="53" value="1"/>
			<Tag tag="198" value="4"/>
			<Tag tag="202" value="1"/>
			<Tag tag="204" value="2"/>
		</GameEntity>
		<Player id="2" playerID="1" accountHi="144115193835963207" accountLo="27390670" name="Adys">
			<Tag tag="17" value="1"/>
			<Tag tag="27" value="64"/>
			<Tag tag="28" value="10"/>
			<Tag tag="29" value="4"/>
			<Tag tag="30" value="1"/>
			<Tag tag="31" value="1"/>
			<Tag tag="49" value="1"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="2"/>
			<Tag tag="176" value="10"/>
			<Tag tag="202" value="2"/>
			<Tag tag="272" value="1"/>
			<Tag tag="399" value="4"/>
		</Player>
		<Player id="3" playerID="2" accountHi="144115188075855872" accountLo="0" name="The Innkeeper">
			<Tag tag="17" value="1"/>
			<Tag tag="23" value="1"/>
			<Tag tag="24" value="1"/>
			<Tag tag="27" value="66"/>
			<Tag tag="28" value="10"/>
			<Tag tag="29" value="4"/>
			<Tag tag="30" value="2"/>
			<Tag tag="31" value="2"/>
			<Tag tag="49" value="1"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="3"/>
			<Tag tag="176" value="10"/>
			<Tag tag="202" value="2"/>
			<Tag tag="272" value="1"/>
			<Tag tag="399" value="3"/>
		</Player>
		<FullEntity id="4" cardID="EX1_046">
			<Tag tag="45" value="4"/>
			<Tag tag="47" value="4"/>
			<Tag tag="48" value="4"/>
			<Tag tag="49" value="3"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="4"/>
			<Tag tag="201" value="2"/>
			<Tag tag="202" value="4"/>
			<Tag tag="203" value="1"/>
			<Tag tag="218" value="1"/>
			<Tag tag="263" value="3"/>
		</FullEntity>
		<FullEntity id="5">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="5"/>
		</FullEntity>
		<FullEntity id="6">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="6"/>
		</FullEntity>
		<FullEntity id="7">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="7"/>
		</FullEntity>
		<FullEntity id="8">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="8"/>
		</FullEntity>
		<FullEntity id="9" cardID="EX1_302">
			<Tag tag="48" value="1"/>
			<Tag tag="49" value="3"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="9"/>
			<Tag tag="201" value="3"/>
			<Tag tag="202" value="5"/>
			<Tag tag="203" value="1"/>
			<Tag tag="263" value="2"/>
		</FullEntity>
		<FullEntity id="10">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="10"/>
		</FullEntity>
		<FullEntity id="11">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="11"/>
		</FullEntity>
		<FullEntity id="12">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="12"/>
		</FullEntity>
		<FullEntity id="13" cardID="EX1_506">
			<Tag tag="45" value="1"/>
			<Tag tag="47" value="2"/>
			<Tag tag="48" value="2"/>
			<Tag tag="49" value="3"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="13"/>
			<Tag tag="201" value="3"/>
			<Tag tag="202" value="4"/>
			<Tag tag="203" value="1"/>
			<Tag tag="218" value="1"/>
			<Tag tag="263" value="1"/>
		</FullEntity>
		<FullEntity id="14">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="14"/>
		</FullEntity>
		<FullEntity id="15">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="15"/>
		</FullEntity>
		<FullEntity id="16">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="16"/>
		</FullEntity>
		<FullEntity id="17">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="17"/>
		</FullEntity>
		<FullEntity id="18">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="18"/>
		</FullEntity>
		<FullEntity id="19">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="19"/>
		</FullEntity>
		<FullEntity id="20">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="20"/>
		</FullEntity>
		<FullEntity id="21">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="21"/>
		</FullEntity>
		<FullEntity id="22">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="22"/>
		</FullEntity>
		<FullEntity id="23" cardID="CS2_065">
			<Tag tag="45" value="3"/>
			<Tag tag="47" value="1"/>
			<Tag tag="48" value="1"/>
			<Tag tag="49" value="3"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="23"/>
			<Tag tag="190" value="1"/>
			<Tag tag="201" value="3"/>
			<Tag tag="202" value="4"/>
			<Tag tag="203" value="2"/>
			<Tag tag="263" value="4"/>
		</FullEntity>
		<FullEntity id="24">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="24"/>
		</FullEntity>
		<FullEntity id="25">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="25"/>
		</FullEntity>
		<FullEntity id="26">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="26"/>
		</FullEntity>
		<FullEntity id="27">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="27"/>
		</FullEntity>
		<FullEntity id="28">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="28"/>
		</FullEntity>
		<FullEntity id="29">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="29"/>
		</FullEntity>
		<FullEntity id="30">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="30"/>
		</FullEntity>
		<FullEntity id="31">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="31"/>
		</FullEntity>
		<FullEntity id="32">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="32"/>
		</FullEntity>
		<FullEntity id="33">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="33"/>
		</FullEntity>
		<FullEntity id="34">
			<Tag tag="49" value="3"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="34"/>
			<Tag tag="263" value="3"/>
		</FullEntity>
		<FullEntity id="35">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="35"/>
		</FullEntity>
		<FullEntity id="36">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="36"/>
		</FullEntity>
		<FullEntity id="37">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="37"/>
		</FullEntity>
		<FullEntity id="38">
			<Tag tag="49" value="3"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="38"/>
			<Tag tag="263" value="1"/>
		</FullEntity>
		<FullEntity id="39">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="39"/>
		</FullEntity>
		<FullEntity id="40">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="40"/>
		</FullEntity>
		<FullEntity id="41">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="41"/>
		</FullEntity>
		<FullEntity id="42">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="42"/>
		</FullEntity>
		<FullEntity id="43">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="43"/>
		</FullEntity>
		<FullEntity id="44">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="44"/>
		</FullEntity>
		<FullEntity id="45">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="45"/>
		</FullEntity>
		<FullEntity id="46">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="46"/>
		</FullEntity>
		<FullEntity id="47">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="47"/>
		</FullEntity>
		<FullEntity id="48">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="48"/>
		</FullEntity>
		<FullEntity id="49">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="49"/>
		</FullEntity>
		<FullEntity id="50">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="50"/>
		</FullEntity>
		<FullEntity id="51">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="51"/>
		</FullEntity>
		<FullEntity id="52">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="52"/>
		</FullEntity>
		<FullEntity id="53">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="53"/>
		</FullEntity>
		<FullEntity id="54">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="54"/>
		</FullEntity>
		<FullEntity id="55">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="55"/>
		</FullEntity>
		<FullEntity id="56">
			<Tag tag="49" value="3"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="56"/>
			<Tag tag="263" value="2"/>
		</FullEntity>
		<FullEntity id="57">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="57"/>
		</FullEntity>
		<FullEntity id="58">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="58"/>
		</FullEntity>
		<FullEntity id="59">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="59"/>
		</FullEntity>
		<FullEntity id="60">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="60"/>
		</FullEntity>
		<FullEntity id="61">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="61"/>
		</FullEntity>
		<FullEntity id="62">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="62"/>
		</FullEntity>
		<FullEntity id="63">
			<Tag tag="49" value="2"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="63"/>
		</FullEntity>
		<FullEntity id="64" cardID="HERO_07">
			<Tag tag="45" value="30"/>
			<Tag tag="49" value="1"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="64"/>
			<Tag tag="201" value="3"/>
			<Tag tag="202" value="3"/>
			<Tag tag="203" value="2"/>
		</FullEntity>
		<FullEntity id="65" cardID="CS2_056">
			<Tag tag="48" value="2"/>
			<Tag tag="49" value="1"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="65"/>
			<Tag tag="201" value="3"/>
			<Tag tag="202" value="10"/>
			<Tag tag="203" value="2"/>
			<Tag tag="313" value="64"/>
		</FullEntity>
		<FullEntity id="66" cardID="HERO_08">
			<Tag tag="45" value="30"/>
			<Tag tag="49" value="1"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="66"/>
			<Tag tag="201" value="3"/>
			<Tag tag="202" value="3"/>
			<Tag tag="203" value="2"/>
		</FullEntity>
		<FullEntity id="67" cardID="CS2_034">
			<Tag tag="48" value="2"/>
			<Tag tag="49" value="1"/>
			<Tag tag="50" value="2"/>
			<Tag tag="53" value="67"/>
			<Tag tag="201" value="3"/>
			<Tag tag="202" value="10"/>
			<Tag tag="203" value="2"/>
			<Tag tag="313" value="66"/>
		</FullEntity>
		<FullEntity id="68" cardID="GAME_005">
			<Tag tag="49" value="3"/>
			<Tag tag="50" value="1"/>
			<Tag tag="53" value="68"/>
			<Tag tag="202" value="5"/>
			<Tag tag="263" value="5"/>
			<Tag tag="313" value="1"/>
		</FullEntity>
		<TagChange entity="3" tag="17" value="1"/>
		<TagChange entity="3" tag="23" value="1"/>
		<TagChange entity="3" tag="24" value="1"/>
		<TagChange entity="3" tag="27" value="66"/>
		<TagChange entity="3" tag="28" value="10"/>
		<TagChange entity="3" tag="29" value="4"/>
		<TagChange entity="3" tag="30" value="2"/>
		<TagChange entity="3" tag="31" value="2"/>
		<TagChange entity="3" tag="49" value="1"/>
		<TagChange entity="3" tag="50" value="2"/>
		<TagChange entity="3" tag="53" value="3"/>
		<TagChange entity="3" tag="176" value="10"/>
		<TagChange entity="3" tag="202" value="2"/>
		<TagChange entity="3" tag="272" value="1"/>
		<TagChange entity="3" tag="399" value="3"/>
		<TagChange entity="2" tag="17" value="1"/>
		<TagChange entity="2" tag="27" value="64"/>
		<TagChange entity="2" tag="28" value="10"/>
		<TagChange entity="2" tag="29" value="4"/>
		<TagChange entity="2" tag="30" value="1"/>
		<TagChange entity="2" tag="31" value="1"/>
		<TagChange entity="2" tag="49" value="1"/>
		<TagChange entity="2" tag="50" value="1"/>
		<TagChange entity="2" tag="53" value="2"/>
		<TagChange entity="2" tag="176" value="10"/>
		<TagChange entity="2" tag="202" value="2"/>
		<TagChange entity="2" tag="272" value="1"/>
		<TagChange entity="2" tag="399" value="4"/>
		<TagChange entity="1" tag="20" value="1"/>
		<TagChange entity="1" tag="49" value="1"/>
		<TagChange entity="1" tag="53" value="1"/>
		<TagChange entity="1" tag="198" value="4"/>
		<TagChange entity="1" tag="202" value="1"/>
		<TagChange entity="1" tag="204" value="2"/>
		<TagChange entity="1" tag="19" value="4"/>
		<Block entity="1" type="5" target="0" ts="18:57:37.350871">
			<TagChange entity="2" tag="305" value="1"/>
			<Choices entity="2" id="1" taskList="3" type="1" min="0" max="5" source="1" ts="18:57:37.390346">
				<Choice index="0" entity="13"/>
				<Choice index="1" entity="9"/>
				<Choice index="2" entity="4"/>
				<Choice index="3" entity="23"/>
				<Choice index="4" entity="68"/>
			</Choices>
			<TagChange entity="3" tag="305" value="1"/>
			<Choices entity="3" id="2" taskList="4" type="1" min="0" max="3" source="1" ts="18:57:37.499747">
				<Choice index="0" entity="38"/>
				<Choice index="1" entity="56"/>
				<Choice index="2" entity="34"/>
			</Choices>
			<ChosenEntities entity="3" id="2" ts="18:57:37.516696">
				<Choice index="0" entity="34"/>
				<Choice index="1" entity="56"/>
				<Choice index="2" entity="38"/>
			</ChosenEntities>
		</Block>
		<TagChange entity="3" tag="305" value="2"/>
		<Block entity="3" type="5" target="0" ts="18:57:37.533592">
			<TagChange entity="3" tag="305" value="3"/>
		</Block>
		<Block entity="3" type="5" target="0" ts="18:57:37.534694">
			<TagChange entity="3" tag="305" value="4"/>
		</Block>
		<SendChoices id="1" type="1" ts="18:57:53.896914">
			<Choice index="0" entity="13"/>
			<Choice index="1" entity="9"/>
			<Choice index="2" entity="23"/>
		</SendChoices>
		<TagChange entity="2" tag="305" value="2"/>
		<Block entity="2" type="5" target="0" ts="18:57:54.345842">
			<ShowEntity entity="7" cardID="EX1_506">
				<Tag tag="45" value="1"/>
				<Tag tag="47" value="2"/>
				<Tag tag="48" value="2"/>
				<Tag tag="49" value="3"/>
				<Tag tag="201" value="3"/>
				<Tag tag="202" value="4"/>
				<Tag tag="203" value="1"/>
				<Tag tag="218" value="1"/>
			</ShowEntity>
			<TagChange entity="7" tag="263" value="3"/>
			<HideEntity entity="4" zone="2" ts="18:57:54.350801"/>
			<TagChange entity="4" tag="49" value="2"/>
			<TagChange entity="4" tag="263" value="0"/>
			<TagChange entity="2" tag="305" value="3"/>
		</Block>
		<Block entity="2" type="5" target="0" ts="18:57:54.352858">
			<TagChange entity="2" tag="305" value="4"/>
			<TagChange entity="1" tag="198" value="6"/>
		</Block>
		<TagChange entity="1" tag="19" value="6"/>
		<Block entity="3" type="5" target="0" ts="18:57:55.048179">
			<TagChange entity="66" tag="271" value="1"/>
			<TagChange entity="67" tag="271" value="1"/>
			<TagChange entity="3" tag="26" value="1"/>
			<TagChange entity="3" tag="399" value="0"/>
			<TagChange entity="1" tag="198" value="17"/>
		</Block>
		<TagChange entity="1" tag="19" value="17"/>
		<Block entity="3" type="5" target="0" ts="18:57:55.053069">
			<TagChange entity="1" tag="198" value="9"/>
		</Block>
		<TagChange entity="1" tag="19" value="9"/>
		<Block entity="3" type="5" target="0" ts="18:57:55.055314">
			<TagChange entity="36" tag="49" value="3"/>
			<TagChange entity="36" tag="263" value="4"/>
			<TagChange entity="3" tag="399" value="1"/>
			<TagChange entity="1" tag="198" value="10"/>
		</Block>
		<TagChange entity="1" tag="19" value="10"/>
		<Block entity="3" type="5" target="0" ts="18:57:55.059886">
			<TagChange entity="1" tag="198" value="12"/>
		</Block>
		<TagChange entity="1" tag="19" value="12"/>
		<Block entity="3" type="5" target="0" ts="18:57:55.449704">
			<TagChange entity="1" tag="198" value="16"/>
		</Block>
		<TagChange entity="1" tag="19" value="16"/>
		<Block entity="3" type="5" target="0" ts="18:57:55.451967">
			<TagChange entity="1" tag="198" value="13"/>
		</Block>
		<TagChange entity="1" tag="19" value="13"/>
		<Block entity="1" type="5" target="0" ts="18:57:55.454226">
			<TagChange entity="3" tag="272" value="0"/>
			<TagChange entity="3" tag="272" value="1"/>
			<TagChange entity="3" tag="23" value="0"/>
			<TagChange entity="2" tag="23" value="1"/>
			<TagChange entity="1" tag="20" value="2"/>
			<TagChange entity="1" tag="198" value="6"/>
		</Block>
		<TagChange entity="1" tag="19" value="6"/>
		<Block entity="2" type="5" target="0" ts="18:57:55.459445">
			<TagChange entity="64" tag="271" value="1"/>
			<TagChange entity="65" tag="271" value="1"/>
			<TagChange entity="2" tag="26" value="1"/>
			<TagChange entity="2" tag="399" value="0"/>
			<TagChange entity="1" tag="198" value="17"/>
		</Block>
		<TagChange entity="1" tag="19" value="17"/>
		<Block entity="2" type="5" target="0" ts="18:57:55.463772">
			<TagChange entity="1" tag="198" value="9"/>
		</Block>
		<TagChange entity="1" tag="19" value="9"/>
		<Block entity="2" type="5" target="0" ts="18:57:55.465372">
			<ShowEntity entity="19" cardID="EX1_066">
				<Tag tag="45" value="2"/>
				<Tag tag="47" value="3"/>
				<Tag tag="48" value="2"/>
				<Tag tag="49" value="3"/>
				<Tag tag="201" value="2"/>
				<Tag tag="202" value="4"/>
				<Tag tag="203" value="1"/>
				<Tag tag="218" value="1"/>
			</ShowEntity>
			<TagChange entity="19" tag="263" value="6"/>
			<TagChange entity="2" tag="399" value="1"/>
			<TagChange entity="1" tag="198" value="10"/>
		</Block>
		<TagChange entity="1" tag="19" value="10"/>
		<Block entity="2" type="5" target="0" ts="18:57:55.470889">
			<TagChange entity="1" tag="198" value="12"/>
		</Block>
		<Options id="2" ts="18:57:55.686249">
			<Option index="0" type="2"/>
			<Option index="1" entity="23" type="3"/>
			<Option index="2" entity="68" type="3"/>
		</Options>
		<SendOption option="1" subOption="-1" target="0" position="1" ts="18:58:08.347658"/>
		<Block entity="23" type="7" target="0" ts="18:58:09.029991">
			<TagChange entity="2" tag="25" value="1"/>
			<TagChange entity="2" tag="418" value="1"/>
			<TagChange entity="2" tag="269" value="1"/>
			<TagChange entity="2" tag="317" value="1"/>
			<TagChange entity="19" tag="263" value="5"/>
			<TagChange entity="68" tag="263" value="4"/>
			<TagChange entity="23" tag="49" value="1"/>
			<TagChange entity="23" tag="263" value="1"/>
			<TagChange entity="23" tag="43" value="1"/>
			<TagChange entity="23" tag="261" value="1"/>
			<TagChange entity="2" tag="397" value="23"/>
			<Block entity="23" type="3" target="0" ts="18:58:09.035141"/>
			<TagChange entity="2" tag="266" value="1"/>
			<TagChange entity="2" tag="358" value="1"/>
		</Block>
		<Options id="3" ts="18:58:09.045809">
			<Option index="0" type="2"/>
			<Option index="1" entity="68" type="3"/>
		</Options>
		<TagChange entity="2" tag="17" value="8"/>
		<TagChange entity="2" tag="17" value="5"/>
		<TagChange entity="3" tag="17" value="4"/>
		<TagChange entity="1" tag="198" value="14"/>
		<TagChange entity="1" tag="19" value="14"/>
		<Block entity="1" type="5" target="0" ts="18:58:10.988696">
			<TagChange entity="1" tag="198" value="15"/>
		</Block>
		<TagChange entity="1" tag="19" value="15"/>
		<TagChange entity="1" tag="204" value="3"/>
		<TagChange entity="2" tag="13" value="2"/>
		<TagChange entity="3" tag="13" value="2"/>
	</Game>
</HSReplay>
```
