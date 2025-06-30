interface Device {
    isEnabled(): boolean;
    enable(): void;
    disable(): void;
    getVolume(): number;
    setVolume(volume: number): void;
    getChannel(): string;
    setChannel(channel: string): void;
}

class Tv implements Device {
    private enabled: boolean = false;
    private volume: number = 50;
    private channel: string = "1";

    isEnabled(): boolean {
        console.log(`TV is ${this.enabled ? "enabled" : "disabled"}.`);
        return this.enabled;
    }

    enable(): void {
        this.enabled = true;
        console.log("TV enabled.");
    }

    disable(): void {
        this.enabled = false;
        console.log("TV disabled.");
    }

    getVolume(): number {
        return this.volume;
    }

    setVolume(volume: number): void {
        this.volume = volume;
        console.log(`TV volume set to ${this.volume}.`);
    }

    getChannel(): string {
        return this.channel;
    }

    setChannel(channel: string): void {
        this.channel = channel;
        console.log(`TV channel set to ${this.channel}.`);
    }
}

class Radio implements Device {
    private enabled: boolean = false;
    private volume: number = 50;
    private channel: string = "FM 1";

    isEnabled(): boolean {
        console.log(`Radio is ${this.enabled ? "enabled" : "disabled"}.`);  
        return this.enabled;
    }

    enable(): void {
        this.enabled = true;
        console.log("Radio enabled.");
    }

    disable(): void {
        this.enabled = false;
        console.log("Radio disabled.");
    }

    getVolume(): number {
        return this.volume;
    }

    setVolume(volume: number): void {
        this.volume = volume;
        console.log(`Radio volume set to ${this.volume}.`);
    }

    getChannel(): string {
        return this.channel;
    }

    setChannel(channel: string): void {
        this.channel = channel;
        console.log(`Radio channel set to ${this.channel}.`);
    }
}

class RemoteControl {
    private device: Device;

    constructor(device: Device) {
        this.device = device;
    }

    togglePower(): void {
        if (this.device.isEnabled()) {
            this.device.disable();
        } else {
            this.device.enable();
        }
    }

    volumeUp(): void {
        const newVolume = this.device.getVolume() + 10;
        this.device.setVolume(newVolume);
    }

    volumeDown(): void {
        const newVolume = this.device.getVolume() - 10;
        this.device.setVolume(newVolume);
    }

    changeChannel(channel: string): void {
        this.device.setChannel(channel);
    }
}