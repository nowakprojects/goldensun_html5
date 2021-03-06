import * as numbers from '../magic_numbers.js';
import { djinni_list } from '../initializers/djinni.js';

export const djinn_status = {
    SET: "set",
    STANDBY: "standby",
    RECOVERY: "recovery"
}

export const djinn_font_colors= {
    [djinn_status.RECOVERY]: numbers.YELLOW_FONT_COLOR,
    [djinn_status.STANDBY]: numbers.RED_FONT_COLOR,
    [djinn_status.SET]: numbers.DEFAULT_FONT_COLOR
}

export class Djinn {
    constructor(
        key_name,
        name,
        description,
        element,
        ability_key_name,
        hp_boost,
        pp_boost,
        atk_boost,
        def_boost,
        agi_boost,
        luk_boost,
        index
    ) {
        this.key_name = key_name;
        this.name = name;
        this.description = description;
        this.element = element;
        this.ability_key_name = ability_key_name;
        this.hp_boost = hp_boost;
        this.pp_boost = pp_boost;
        this.atk_boost = atk_boost;
        this.def_boost = def_boost;
        this.agi_boost = agi_boost;
        this.luk_boost = luk_boost;
        this.status = djinn_status.SET;
        this.index = index;
    }

    set_status(status, char) {
        this.status = status;
        char.update_elemental_attributes();
        char.update_class();
        char.update_attributes();
        char.update_abilities();
    }

    static has_standby_djinn(max_char) {
        return _.some(party_data.members.slice(0, max_char).map(c => c.djinni).map(djinn_keys => {
            return djinn_keys.filter(key => djinni_list[key].status === djinn_status.STANDBY).length;
        }));
    }
}