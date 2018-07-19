class OptionComponent {
  
  _hostElement
  _onSelectCallbacks
  _onUnselectCallbacks
  
  constructor(hostElement) {
    this._hostElement = hostElement
    this._onSelectCallbacks = new Array()
    this._onUnselectCallbacks = new Array()
    this._bindEvents()
    
    if(this.selected && this.disabled) this.unselect()
  }
  
  /**
   * Método que retorna o valor do componente. 
   * Se ele tiver uma propriedade "value", usa o valor dessa propriedade, se não, usa o texto dentro do elemento host.
   */
  get value() {
    const valueAttribute = this._hostElement.getAttribute('value');
    if (valueAttribute !== null)
      return valueAttribute;
    else
      return this.text
  }
  
  set value(value) {
    this._hostElement.setAttribute('value', value)
  }
  
  get text() {
    return this._hostElement.textContent
  }
  
  set text(novoTexto) {
    this._hostElement.textContent = novoTexto
  }
  
  enable() { 
    this._hostElement.removeAttribute('disabled')
  }
  
  disable() {
    this._hostElement.setAttribute('disabled', '')
    this.unselect();
  }
  
  get enabled() {
    return !this.disabled
  }
  
  get disabled() {
    return this._hostElement.hasAttribute('disabled')
  }
  
  select() {
    if (this.enabled && !this.selected) {
      this._hostElement.setAttribute('selected', '')
      this._onSelectCallbacks.forEach(callback => callback())
    }
  }
  
  unselect() {
    if (this.selected) {
      this._hostElement.removeAttribute('selected')
      this._onUnselectCallbacks.forEach(callback => callback())
    }
  }
  
  toggleSelect() {
    this.selected ? this.unselect() : this.select()
  }
  
  get selected() {
    return this._hostElement.hasAttribute("selected")
  }
  
  onSelect(callback) {
    this._onSelectCallbacks.push(callback)
  }
  
  onUnselect(callback) {
    this._onUnselectCallbacks.push(callback)
  }
  
  _bindEvents() {
    this._hostElement
      .addEventListener("click", this._onClick.bind(this))
  }
  
  _onClick() {
    this.toggleSelect()
  }
  
}

class SelectComponent {
  
  _hostElement
  _optionComponents
  
  constructor (_hostElement){
    this._hostElement = _hostElement
    
    const div = document.createElement("div")
    div.classList.add("options")
    this._hostElement.appendChild(div)
    const optionElements = Array.from(this._hostElement.querySelectorAll("app-option"))
    optionElements.forEach(option => div.appendChild(option)) 
    
    this._optionComponents = optionElements.map(el => new OptionComponent(el))
  }
  
  _bindEvents() {
    this._hostElement
      .addEventListener("click", this._onClick.bind(this))
  }
  
  _onClick() {
    this._displayOptions()
  }
  
  _displayOptions() {
    
  
  }
}



const selectComponent = new SelectComponent(document.querySelector('app-select'))