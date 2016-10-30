function getDecklist(data) {
	var cardList = d3.nest()
		.key(function (d) { return d })
		.rollup(function (v) { return v.length })
		.entries(eval(data.card_list))

	var idList = d3.nest()
		.key(function (d) { return d })
		.rollup(function (v) { return v.length })
		.entries(eval(data.card_ids))

	var formattedData = cardList.map(function (d, i) {
		return {
			name: d.key,
			count: d.value,
			id: idList[i].key
		}
	})

	return {
		archetype: data.archetype,
		deckId: data.deck_id,
		matchCount: data.match_count,
		winRate: data.win_rate,
		cardList: cardList,
		idList: idList,
		formattedData: formattedData
	}
}


function makeDeckList(deck) {
	var cardList = deck.cardList;
	var idList = deck.idList;
	var formattedData = deck.formattedData;

	var archetype = deck.archetype.replace("_", " ").toLowerCase()

	d3.select(".deck-id")
		.text(deck.deckId);

	d3.select(".deck-archetype")
		.text(archetype);

	d3.select(".deck-matches")
		.text(deck.matchCount);

	d3.select(".deck-winrate")
		.text(deck.winRate + "%");

	var cards = d3.select(".deckinfo")
		.select(".deckContents")
		.selectAll(".card")
		.data(formattedData)

	cards.enter()
		.append("div")
		.classed("card", true)
		.style("width", "100%")
		.html(function (d) { return '<span class="count">' + d.count + "</span>" + d.name})
		.style("background-image", function (d) { return "url(https://art.hearthstonejson.com/v1/tiles/" + d.id + ".png)" })

	cards.exit()
		.remove()

	cards
		.html(function (d) { return '<span class="count">' + d.count + "</span>" + d.name	})
		.style("background-image", function (d) { return "url(https://art.hearthstonejson.com/v1/tiles/" + d.id + ".png)" })
}
