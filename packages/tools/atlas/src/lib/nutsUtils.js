import * as _ from 'lamb';

export const getNutsName = _.adapter([
	_.casus(_.hasKey('NAME_LATN'), _.getKey('NAME_LATN')),
	_.casus(_.hasKey('NUTS_NAME'), _.getKey('NUTS_NAME')),
	_.always('Unknown'),
]);
