export default {
	"Date_YYYYMMDD": {
		"format": "YYYYMMDD",
		"kind": "date",
		"type": "Datestring"
	},
	"URL": {
		"kind": "uri",
		"type": "string"
	},
	"NutsRegion": {
		"level": "int",
		"name": "GeoRegion.name",
		"nuts_id": "GeoRegion.<region_type>_id",
		"nuts_year_enforced": "GeoRegion.<region_type>_year_enforced",
		"nuts_year_spec": "GeoRegion.<region_type>_year_spec",
		"region_type": "nuts",
		"source_url": "GeoRegion.source_url",
		"source": "GeoRegion.source",
		"type": "GeoRegion"
	},
	"LepRegion": {
		"lep_id": "GeoRegion.id",
		"lep_year_enforced": "GeoRegion.year_enforced",
		"lep_year_spec": "GeoRegion.year_spec",
		"name": "GeoRegion.name",
		"region_type": "lep",
		"source_url": "GeoRegion.source_url",
		"source": "GeoRegion.source",
		"type": "GeoRegion"
	},
	"EUR": {
		"kind": "currency",
		"label": "Euro",
		"data_type": "int|float",
		"unit_string": "EUR",
		"type": "Unit"
	},
	"GBP": {
		"kind": "currency",
		"label": "British Pound",
		"data_type": "int|float",
		"unit_string": "GBP",
		"type": "Unit"
	},
	"USD": {
		"kind": "currency",
		"label": "US Dollar",
		"data_type": "int|float",
		"unit_string": "USD",
		"type": "Unit"
	},
	"GravimetricUnit": {
		"kind": "density",
		"label": "Gravimetric Units",
		"data_type": "int|float",
		"unit_string": "µg m^-3",
		"type": "Unit"
	},
	"Area_hectare": {
		"kind": "area",
		"label": "Hectare",
		"data_type": "int|float",
		"unit_string": "hectare",
		"type": "Unit"
	},
	"REF": {
		"kind": "score",
		"label": "REF score",
		"data_type": "int|float",
		"unit_string": "REF Score (1-4)",
		"type": "Unit"
	},
	"FTE": {
		"kind": "score",
		"label": "Full Time Equivalent",
		"data_type": "float",
		"unit_string": "FTE",
		"type": "Unit"
	},
	"BitTransferRate": {
		"kind": "bit transfer rate",
		"data_type": "float",
		"unit_string": "Mb/s",
		"type": "Unit"
	}
};
