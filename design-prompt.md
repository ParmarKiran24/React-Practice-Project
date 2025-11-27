
## Design Rule Entries

_New design rules from PDFs will be appended below with date stamps_

---

### Entry #1 — November 27, 2025
**Source**: `Input- Regular.pdf` & `Input- small.pdf`  
**Summary**: Input field specifications for regular and small sizes

#### Input Field Design Tokens

```css
/* Input Field Sizes */
--input-height-regular: 48px;
--input-height-small: 40px;

/* Input Field Padding */
--input-padding-regular: 12px 16px;
--input-padding-small: 8px 12px;

/* Input Field Typography */
--input-font-size-regular: 16px;
--input-font-size-small: 14px;
--input-line-height-regular: 24px;
--input-line-height-small: 20px;

/* Input Field Border */
--input-border-width: 1px;
--input-border-style: solid;
--input-border-color-default: #D1D5DB;
--input-border-color-hover: #9CA3AF;
--input-border-color-focus: #3B82F6;
--input-border-color-error: #EF4444;
--input-border-color-success: #10B981;
--input-border-color-disabled: #E5E7EB;

/* Input Field Border Radius */
--input-radius-regular: 8px;
--input-radius-small: 6px;

/* Input Field Background */
--input-bg-default: #FFFFFF;
--input-bg-hover: #F9FAFB;
--input-bg-focus: #FFFFFF;
--input-bg-disabled: #F3F4F6;

/* Input Field Text Colors */
--input-text-default: #111827;
--input-text-placeholder: #9CA3AF;
--input-text-disabled: #D1D5DB;

/* Input Field Label */
--input-label-font-size: 14px;
--input-label-font-weight: 500;
--input-label-color: #374151;
--input-label-margin-bottom: 6px;

/* Input Field Helper Text */
--input-helper-font-size: 12px;
--input-helper-color: #6B7280;
--input-helper-margin-top: 4px;

/* Input Field Error Text */
--input-error-font-size: 12px;
--input-error-color: #EF4444;
--input-error-margin-top: 4px;

/* Required Asterisk */
--input-required-color: #EF4444;
```

#### Regular Input Field Component

```tsx
// React/TypeScript Example
interface InputProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  size?: 'regular' | 'small';
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  required = false,
  error,
  helperText,
  disabled = false,
  size = 'regular'
}) => {
  return (
    <div className="input-wrapper">
      {label && (
        <label className={`input-label input-label-${size}`}>
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <input
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        className={`input-field input-field-${size} ${error ? 'input-error' : ''}`}
      />
      {error && <p className="input-error-text">{error}</p>}
      {!error && helperText && <p className="input-helper-text">{helperText}</p>}
    </div>
  );
};
```

#### CSS Implementation

```css
/* Input Wrapper */
.input-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* Label Styles */
.input-label {
  font-size: var(--input-label-font-size);
  font-weight: var(--input-label-font-weight);
  color: var(--input-label-color);
  margin-bottom: var(--input-label-margin-bottom);
  display: block;
}

.input-required {
  color: var(--input-required-color);
  margin-left: 2px;
}

/* Regular Input Field */
.input-field-regular {
  height: var(--input-height-regular);
  padding: var(--input-padding-regular);
  font-size: var(--input-font-size-regular);
  line-height: var(--input-line-height-regular);
  border-radius: var(--input-radius-regular);
}

/* Small Input Field */
.input-field-small {
  height: var(--input-height-small);
  padding: var(--input-padding-small);
  font-size: var(--input-font-size-small);
  line-height: var(--input-line-height-small);
  border-radius: var(--input-radius-small);
}

/* Base Input Styles */
.input-field {
  width: 100%;
  border: var(--input-border-width) var(--input-border-style) var(--input-border-color-default);
  background: var(--input-bg-default);
  color: var(--input-text-default);
  transition: all 0.2s ease-in-out;
  outline: none;
  font-family: inherit;
}

/* Input Placeholder */
.input-field::placeholder {
  color: var(--input-text-placeholder);
}

/* Input Hover State */
.input-field:hover:not(:disabled) {
  background: var(--input-bg-hover);
  border-color: var(--input-border-color-hover);
}

/* Input Focus State */
.input-field:focus {
  background: var(--input-bg-focus);
  border-color: var(--input-border-color-focus);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Input Error State */
.input-field.input-error {
  border-color: var(--input-border-color-error);
}

.input-field.input-error:focus {
  border-color: var(--input-border-color-error);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Input Disabled State */
.input-field:disabled {
  background: var(--input-bg-disabled);
  border-color: var(--input-border-color-disabled);
  color: var(--input-text-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}

/* Helper Text */
.input-helper-text {
  font-size: var(--input-helper-font-size);
  color: var(--input-helper-color);
  margin-top: var(--input-helper-margin-top);
  margin-bottom: 0;
}

/* Error Text */
.input-error-text {
  font-size: var(--input-error-font-size);
  color: var(--input-error-color);
  margin-top: var(--input-error-margin-top);
  margin-bottom: 0;
  display: flex;
  align-items: center;
  gap: 4px;
}
```

#### Tailwind CSS Implementation

```tsx
// Tailwind classes for Regular Input
<input 
  className="
    h-12 px-4 py-3
    text-base leading-6
    rounded-lg
    border border-gray-300
    bg-white text-gray-900
    placeholder:text-gray-400
    transition-all duration-200
    hover:bg-gray-50 hover:border-gray-400
    focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100
    disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-300 disabled:cursor-not-allowed
    aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-100
  "
/>

// Tailwind classes for Small Input
<input 
  className="
    h-10 px-3 py-2
    text-sm leading-5
    rounded-md
    border border-gray-300
    bg-white text-gray-900
    placeholder:text-gray-400
    transition-all duration-200
    hover:bg-gray-50 hover:border-gray-400
    focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100
    disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-300 disabled:cursor-not-allowed
    aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-100
  "
/>
```

#### State Specifications

| State | Border | Background | Text Color | Additional Effects |
|-------|--------|------------|------------|-------------------|
| Default | `#D1D5DB` | `#FFFFFF` | `#111827` | None |
| Hover | `#9CA3AF` | `#F9FAFB` | `#111827` | Smooth transition 200ms |
| Focus | `#3B82F6` | `#FFFFFF` | `#111827` | Blue ring shadow (0 0 0 3px rgba(59,130,246,0.1)) |
| Error | `#EF4444` | `#FFFFFF` | `#111827` | Red ring on focus |
| Disabled | `#E5E7EB` | `#F3F4F6` | `#D1D5DB` | Opacity 0.6, cursor not-allowed |

#### Accessibility Notes
- **Focus Ring**: Always visible with 3px offset for keyboard navigation
- **Contrast Ratio**: Text meets WCAG AA (4.5:1 minimum)
- **Touch Target**: Regular input (48px) meets minimum 44px touch target
- **ARIA Support**: Use `aria-invalid="true"` for error states, `aria-describedby` for helper/error text
- **Label Association**: Always use `<label>` with `htmlFor` matching input `id`
- **Required Indicator**: Visual asterisk (*) in red for required fields

#### Usage Guidelines
1. Use **Regular (48px)** for primary forms and desktop layouts
2. Use **Small (40px)** for compact forms, filters, or mobile-optimized layouts
3. Always provide labels for accessibility
4. Use helper text for additional context, error text for validation feedback
5. Disable inputs only when necessary; prefer read-only for better UX
6. Ensure placeholder text is supplementary, not a replacement for labels

---

### Entry #2 — November 27, 2025
**Source**: `News Action Button.pdf`  
**Summary**: Action button specifications for news/content cards with "Read More" CTA

#### Action Button Design Tokens

```css
/* Action Button Sizing */
--btn-action-height: 36px;
--btn-action-min-width: 100px;
--btn-action-padding: 8px 20px;

/* Action Button Typography */
--btn-action-font-size: 14px;
--btn-action-font-weight: 500;
--btn-action-line-height: 20px;
--btn-action-letter-spacing: 0.01em;
--btn-action-text-transform: none;

/* Action Button Colors */
--btn-action-bg-default: transparent;
--btn-action-bg-hover: rgba(0, 0, 0, 0.04);
--btn-action-bg-active: rgba(0, 0, 0, 0.08);
--btn-action-bg-disabled: transparent;

--btn-action-text-default: #1976D2;
--btn-action-text-hover: #1565C0;
--btn-action-text-active: #0D47A1;
--btn-action-text-disabled: #BDBDBD;

/* Action Button Border */
--btn-action-border-width: 1px;
--btn-action-border-style: solid;
--btn-action-border-color-default: #1976D2;
--btn-action-border-color-hover: #1565C0;
--btn-action-border-color-active: #0D47A1;
--btn-action-border-color-disabled: #E0E0E0;
--btn-action-border-radius: 6px;

/* Action Button Transitions */
--btn-action-transition-duration: 200ms;
--btn-action-transition-timing: ease-in-out;
```

#### Action Button Component

```tsx
// React/TypeScript Example
interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  variant?: 'outlined' | 'text';
}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
  disabled = false,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  variant = 'outlined'
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn-action btn-action-${variant} ${fullWidth ? 'btn-action-full' : ''}`}
    >
      {icon && iconPosition === 'left' && <span className="btn-action-icon">{icon}</span>}
      <span className="btn-action-text">{children}</span>
      {icon && iconPosition === 'right' && <span className="btn-action-icon">{icon}</span>}
    </button>
  );
};
```

#### CSS Implementation

```css
/* Base Action Button Styles */
.btn-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: var(--btn-action-height);
  min-width: var(--btn-action-min-width);
  padding: var(--btn-action-padding);
  font-size: var(--btn-action-font-size);
  font-weight: var(--btn-action-font-weight);
  line-height: var(--btn-action-line-height);
  letter-spacing: var(--btn-action-letter-spacing);
  text-transform: var(--btn-action-text-transform);
  border-radius: var(--btn-action-border-radius);
  cursor: pointer;
  transition: all var(--btn-action-transition-duration) var(--btn-action-transition-timing);
  white-space: nowrap;
  font-family: inherit;
  outline: none;
}

/* Outlined Variant (Primary for News) */
.btn-action-outlined {
  background: var(--btn-action-bg-default);
  color: var(--btn-action-text-default);
  border: var(--btn-action-border-width) var(--btn-action-border-style) var(--btn-action-border-color-default);
}

/* Text Variant (No Border) */
.btn-action-text {
  background: var(--btn-action-bg-default);
  color: var(--btn-action-text-default);
  border: none;
}

/* Hover State */
.btn-action-outlined:hover:not(:disabled) {
  background: var(--btn-action-bg-hover);
  color: var(--btn-action-text-hover);
  border-color: var(--btn-action-border-color-hover);
  transform: translateY(-1px);
}

.btn-action-text:hover:not(:disabled) {
  background: var(--btn-action-bg-hover);
  color: var(--btn-action-text-hover);
}

/* Active State */
.btn-action-outlined:active:not(:disabled) {
  background: var(--btn-action-bg-active);
  color: var(--btn-action-text-active);
  border-color: var(--btn-action-border-color-active);
  transform: translateY(0);
}

.btn-action-text:active:not(:disabled) {
  background: var(--btn-action-bg-active);
  color: var(--btn-action-text-active);
}

/* Focus State */
.btn-action:focus-visible {
  outline: 2px solid var(--btn-action-text-default);
  outline-offset: 2px;
}

/* Disabled State */
.btn-action:disabled {
  background: var(--btn-action-bg-disabled);
  color: var(--btn-action-text-disabled);
  border-color: var(--btn-action-border-color-disabled);
  cursor: not-allowed;
  opacity: 0.6;
  transform: none;
}

/* Full Width */
.btn-action-full {
  width: 100%;
}

/* Icon Styles */
.btn-action-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

.btn-action-icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
```

#### Tailwind CSS Implementation

```tsx
// Tailwind classes for Outlined Action Button
<button 
  className="
    inline-flex items-center justify-center gap-2
    h-9 min-w-[100px] px-5 py-2
    text-sm font-medium leading-5 tracking-wide
    rounded-md
    bg-transparent text-blue-600
    border border-blue-600
    transition-all duration-200
    hover:bg-blue-50 hover:text-blue-700 hover:border-blue-700 hover:-translate-y-px
    active:bg-blue-100 active:text-blue-800 active:border-blue-800 active:translate-y-0
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
    disabled:bg-transparent disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:transform-none
  "
>
  Read More
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
    <path d="M5 3l6 5-6 5V3z" />
  </svg>
</button>

// Tailwind classes for Text Action Button
<button 
  className="
    inline-flex items-center justify-center gap-2
    h-9 min-w-[100px] px-5 py-2
    text-sm font-medium leading-5 tracking-wide
    rounded-md
    bg-transparent text-blue-600
    border-0
    transition-all duration-200
    hover:bg-blue-50 hover:text-blue-700
    active:bg-blue-100 active:text-blue-800
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
    disabled:bg-transparent disabled:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60
  "
>
  Read More
</button>
```

#### State Specifications

| State | Background | Text Color | Border | Additional Effects |
|-------|------------|------------|--------|-------------------|
| Default | `transparent` | `#1976D2` | `1px solid #1976D2` | None |
| Hover | `rgba(0,0,0,0.04)` | `#1565C0` | `1px solid #1565C0` | Lift -1px, 200ms transition |
| Active | `rgba(0,0,0,0.08)` | `#0D47A1` | `1px solid #0D47A1` | Reset to 0px |
| Focus | `transparent` | `#1976D2` | `1px solid #1976D2` | 2px outline offset 2px |
| Disabled | `transparent` | `#BDBDBD` | `1px solid #E0E0E0` | Opacity 0.6, no pointer |

#### Icon Guidelines
- **Icon Size**: 16x16px
- **Icon Spacing**: 8px gap between text and icon
- **Icon Position**: Right side (default for "Read More" CTAs)
- **Icon Color**: Inherits text color (currentColor)
- **Common Icons**: Arrow right (→), Chevron right (›), External link (↗)

#### Accessibility Notes
- **Focus Visible**: 2px outline with 2px offset for keyboard navigation
- **Contrast Ratio**: Blue text on white meets WCAG AA (4.5:1+)
- **Touch Target**: 36px height meets 44px when including focus outline
- **ARIA**: Use `aria-label` when icon-only, `aria-disabled="true"` for disabled state
- **Keyboard Support**: Full Enter/Space key activation support

#### Usage Context
- **Primary Use**: News cards, blog posts, article previews
- **CTA Text**: "Read More", "Learn More", "View Details", "See All"
- **Placement**: Bottom-right of content cards, inline with card padding
- **Responsive**: Full-width on mobile (< 640px), auto-width on desktop
- **Grouping**: Single button per card; avoid multiple action buttons

#### Variants

**Outlined (Primary)**
- Use for primary actions on content cards
- Most visual weight for clear CTAs
- Best for news/blog listings

**Text (Secondary)**
- Use for less prominent actions
- Reduces visual clutter on dense layouts
- Good for "Load More" or pagination

#### Do's and Don'ts

✅ **Do:**
- Use consistent "Read More" text across similar content
- Include directional icon (right arrow/chevron)
- Maintain minimum touch target size
- Provide hover/focus feedback

❌ **Don't:**
- Use vague CTAs like "Click Here" or "More"
- Mix outlined and text variants on same card
- Remove focus indicators for accessibility
- Stack multiple action buttons vertically

---
