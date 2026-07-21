import * as runtime from 'react/jsx-runtime'

/**
 * Velite compiles MDX bodies to a function-body string. Running it with the
 * React jsx-runtime in scope yields the component. This is Velite's documented
 * pattern and keeps MDX compilation at build time rather than in the browser.
 */
function useMDXComponent(code: string) {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

export function MDXContent({ code }: { code: string }) {
  const Component = useMDXComponent(code)
  return <Component />
}
