---
layout: page
title: HSReplay - Hearthstone Replays
permalink: /hsreplay/
---

**HSReplay** is a specification for Hearthstone replays.

The DTD for HSReplay 1.0 is available here:

http://hearthsim.info/hsreplay/dtd/hsreplay-1.0.dtd

For development and reference implementations in Python and C#, see the Github repository:

https://github.com/hearthsim/hsreplay


## Example replay

Here follows a very, very shortened example file. Real-world examples will have
far more tag changes, entity definitions, etc.

```xml
<?xml version="1.0" ?>
<!DOCTYPE hsreplay SYSTEM "http://hearthsim.info/hsreplay/dtd/hsreplay-1.0.dtd">
<HSReplay version="1.0" build="10833">
	<Game ts="02:40:37.6057520" type="1">
		<GameEntity id="1">
			<Tag tag="20" value="1"/>
			<Tag tag="49" value="1"/>
			<Tag tag="53" value="1"/>
			<Tag tag="198" value="4"/>
			<Tag tag="202" value="1"/>
			<Tag tag="204" value="2"/>
		</GameEntity>
		<Player accountHi="144115198130930503" accountLo="18493185" id="2" name="Adys" playerID="1">
			<Tag tag="17" value="1"/>
			<Tag tag="23" value="1"/>
			<Tag tag="24" value="1"/>
			<Tag tag="27" value="64"/>
			<Tag tag="28" value="10"/>
		</Player>
		<Player accountHi="144115188075855872" accountLo="0" id="3" name="Zinaar" playerID="2">
			<Tag tag="17" value="1"/>
			<Tag tag="27" value="66"/>
			<Tag tag="28" value="10"/>
			<Tag tag="29" value="4"/>
			<Tag tag="30" value="2"/>
			<Tag tag="31" value="2"/>
		</Player>
		<FullEntity id="4">
			<Tag tag="49" value="2"/>
		</FullEntity>
		<FullEntity id="5">
			<Tag tag="49" value="2"/>
		</FullEntity>
		<FullEntity id="6">
			<Tag tag="49" value="2"/>
		</FullEntity>
		<Action entity="1" index="-1" ts="02:40:38.4098640" type="5">
			<TagChange entity="2" tag="305" value="1"/>
			<Choices entity="1" max="3" min="0" playerID="2" source="1" taskList="3" ts="02:40:38.4477720" type="1">
				<Choice entity="27" index="0"/>
				<Choice entity="17" index="1"/>
				<Choice entity="13" index="2"/>
			</Choices>
			<TagChange entity="3" tag="305" value="1"/>
			<Choices entity="2" max="4" min="0" playerID="3" source="1" taskList="4" ts="02:40:38.6063320" type="1">
				<Choice entity="44" index="0"/>
				<Choice entity="63" index="1"/>
				<Choice entity="39" index="2"/>
				<Choice entity="60" index="3"/>
			</Choices>
		</Action>
		<ChosenEntities count="3" entity="2" playerID="3" ts="02:40:38.6402700">
			<Choice entity="60" index="0"/>
			<Choice entity="39" index="1"/>
			<Choice entity="44" index="2"/>
		</ChosenEntities>
		<Options id="6" ts="02:42:08.4098200">
			<Option index="0" type="2"/>
			<Option entity="27" index="1" type="3"/>
			<Option entity="25" index="2" type="3"/>
			<Option entity="23" index="3" type="3">
				<Target entity="40" index="0"/>
				<Target entity="58" index="1"/>
			</Option>
			<Option entity="68" index="4" type="3"/>
			<Option entity="8" index="5" type="3">
				<Target entity="64" index="0"/>
				<Target entity="66" index="1"/>
				<Target entity="40" index="2"/>
				<Target entity="58" index="3"/>
			</Option>
			<Option entity="65" index="6" type="3"/>
		</Options>
		<SendOption option="4" position="0" subOption="-1" target="0"/>
	</Game>
</HSReplay>
```
