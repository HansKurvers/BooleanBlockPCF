import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class BooleanBlockCard implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container!: HTMLDivElement;
    private _context!: ComponentFramework.Context<IInputs>;
    private _notifyOutputChanged!: () => void;
    
    private _cardContainer!: HTMLDivElement;
    private _switchContainer!: HTMLDivElement;
    private _switchInput!: HTMLInputElement;
    private _switchLabel!: HTMLLabelElement;
    private _textArea!: HTMLTextAreaElement;
    
    private _booleanValue: boolean = false;
    private _textValue: string = "";
    private _defaultText: string = "";

    constructor() { }

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this._context = context;
        this._notifyOutputChanged = notifyOutputChanged;
        this._container = container;
        
        // Add debugging
        console.log("BooleanBlockCard init called", context.parameters);
        
        this._booleanValue = context.parameters.booleanValue?.raw ?? false;
        this._textValue = context.parameters.textValue?.raw ?? "";
        this._defaultText = context.parameters.defaultText?.raw ?? "Enter your text here...";
        
        console.log("Initial values:", { boolean: this._booleanValue, text: this._textValue, default: this._defaultText });
        
        this.createCardUI();
        this.updateTextFieldState();
        
        console.log("Component initialized, container:", this._container);
    }

    private createCardUI(): void {
        this._cardContainer = document.createElement("div");
        this._cardContainer.className = "boolean-block-card";
        
        this._switchContainer = document.createElement("div");
        this._switchContainer.className = "switch-container";
        
        this._switchInput = document.createElement("input");
        this._switchInput.type = "checkbox";
        this._switchInput.id = "boolean-switch";
        this._switchInput.className = "switch-input";
        this._switchInput.checked = this._booleanValue;
        this._switchInput.addEventListener("change", this.onSwitchChange.bind(this));
        
        this._switchLabel = document.createElement("label");
        this._switchLabel.htmlFor = "boolean-switch";
        this._switchLabel.className = "switch-label";
        this._switchLabel.innerHTML = '<span class="switch-slider"></span>';
        
        const switchText = document.createElement("span");
        switchText.className = "switch-text";
        switchText.textContent = "Enable custom text";
        
        this._switchContainer.appendChild(this._switchInput);
        this._switchContainer.appendChild(this._switchLabel);
        this._switchContainer.appendChild(switchText);
        
        this._textArea = document.createElement("textarea");
        this._textArea.className = "text-area";
        this._textArea.rows = 5;
        this._textArea.addEventListener("input", this.onTextChange.bind(this));
        
        this._cardContainer.appendChild(this._switchContainer);
        this._cardContainer.appendChild(this._textArea);
        
        this._container.appendChild(this._cardContainer);
    }

    private onSwitchChange(): void {
        this._booleanValue = this._switchInput.checked;
        this.updateTextFieldState();
        this._notifyOutputChanged();
    }

    private onTextChange(): void {
        if (this._booleanValue) {
            this._textValue = this._textArea.value;
            this._notifyOutputChanged();
        }
    }

    private updateTextFieldState(): void {
        if (this._booleanValue) {
            this._textArea.disabled = false;
            this._textArea.value = this._textValue;
            this._textArea.placeholder = "Enter your custom text...";
            this._textArea.classList.remove("disabled");
        } else {
            this._textArea.disabled = true;
            this._textArea.value = this._defaultText;
            this._textArea.classList.add("disabled");
        }
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this._context = context;
        
        const newBooleanValue = context.parameters.booleanValue.raw || false;
        const newTextValue = context.parameters.textValue.raw || "";
        const newDefaultText = context.parameters.defaultText.raw || this._defaultText;
        
        if (newBooleanValue !== this._booleanValue || 
            newTextValue !== this._textValue || 
            newDefaultText !== this._defaultText) {
            
            this._booleanValue = newBooleanValue;
            this._textValue = newTextValue;
            this._defaultText = newDefaultText;
            
            this._switchInput.checked = this._booleanValue;
            this.updateTextFieldState();
        }
    }

    public getOutputs(): IOutputs {
        return {
            booleanValue: this._booleanValue,
            textValue: this._booleanValue ? this._textValue : this._defaultText
        };
    }

    public destroy(): void {
        this._switchInput.removeEventListener("change", this.onSwitchChange.bind(this));
        this._textArea.removeEventListener("input", this.onTextChange.bind(this));
    }
}