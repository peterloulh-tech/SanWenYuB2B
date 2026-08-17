import { Check, ChevronDown } from 'lucide-react'
import '../../styles/linked-select.css'

export default function LinkedSelect({ id, label, options, value, open, onToggle, onSelect, placeholder = '请选择' }) {
  const selected = options.find((option) => option.id === value)
  const menuId = `${id}-menu`

  return <div className="linked-category-control">
    <span>{label}</span>
    <button id={id} type="button" className="linked-category-trigger" role="combobox" aria-label={label} aria-expanded={open} aria-controls={menuId} onClick={onToggle} onKeyDown={(event) => event.key === 'Escape' && onToggle(false)}>
      <b className={selected ? '' : 'placeholder'}>{selected?.label || placeholder}</b><ChevronDown />
    </button>
    {open && <div id={menuId} className="linked-category-menu" role="listbox" aria-label={`${label}选项`}>
      {options.map((option) => <button type="button" role="option" aria-selected={option.id === value} className={option.id === value ? 'selected' : ''} onClick={() => onSelect(option.id)} key={option.id}><span>{option.label}</span>{option.id === value && <Check />}</button>)}
    </div>}
  </div>
}
