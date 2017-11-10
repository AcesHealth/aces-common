import { Current } from './current';
import { Length } from './length';
import { Mass } from './mass';
import { Temperature } from './temperature';
import { Time } from './time';
import { Volume } from './volume';

function symbolOf(unit : Current | Length | Mass | Temperature | Time | Volume) {
    if(unit == Current.milliampere) return 'mA';
    if(unit == Current.ampere) return 'A';
    if(unit == Current.kiloampere) return 'kA';

    if(unit == Length.millimeter) return 'mm';
    if(unit == Length.centimeter) return 'cm';
    if(unit == Length.meter) return 'm';
    if(unit == Length.kilometer) return 'km';

    if(unit == Mass.milligram) return 'mg';
    if(unit == Mass.gram) return 'g';
    if(unit == Mass.kilogram) return 'kg';

    if(unit == Temperature.Celcius) return 'C';
    if(unit == Temperature.Farenheit) return 'F';

    if(unit == Time.millisecond) return 'ms';
    if(unit == Time.second) return 's';
    if(unit == Time.minute) return 'min';
    if(unit == Time.hour) return 'hr';
    if(unit == Time.day) return 'd';
    if(unit == Time.week) return 'w';
    if(unit == Time.month) return 'mon';
    if(unit == Time.year) return 'yr';

    if(unit == Volume.millilitre) return 'mL';
    if(unit == Volume.litre) return 'L';

    // if this line fails to compile, you are missing a unit -> symbol conversion
    return assertUnreachable(unit);
}

function assertUnreachable(x : never) : never {
    throw new Error('Unreachable function called');
}

export { Current, Length, Mass, Temperature, Time, Volume, symbolOf };