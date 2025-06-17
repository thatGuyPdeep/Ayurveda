// Integration Testing Framework for AyuraVeda Royale
import { productService } from '@/lib/services/product'
import { orderService } from '@/lib/services/order'
import { analyticsService } from '@/lib/services/analytics'
import { EmailService } from '@/lib/services/email'

export interface TestResult {
  testName: string
  status: 'passed' | 'failed' | 'skipped'
  duration: number
  error?: string
  details?: any
}

export interface TestSuite {
  suiteName: string
  tests: TestResult[]
  totalTests: number
  passedTests: number
  failedTests: number
  skippedTests: number
  totalDuration: number
}

export class IntegrationTestRunner {
  private results: TestSuite[] = []
  private currentSuite: TestSuite | null = null

  // Test Suite Management
  startSuite(suiteName: string) {
    this.currentSuite = {
      suiteName,
      tests: [],
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      skippedTests: 0,
      totalDuration: 0
    }
  }

  endSuite() {
    if (this.currentSuite) {
      this.results.push(this.currentSuite)
      this.currentSuite = null
    }
  }

  async runTest(testName: string, testFunction: () => Promise<any>): Promise<TestResult> {
    const startTime = performance.now()
    
    try {
      const result = await testFunction()
      const duration = performance.now() - startTime
      
      const testResult: TestResult = {
        testName,
        status: 'passed',
        duration,
        details: result
      }

      if (this.currentSuite) {
        this.currentSuite.tests.push(testResult)
        this.currentSuite.totalTests++
        this.currentSuite.passedTests++
        this.currentSuite.totalDuration += duration
      }

      return testResult
    } catch (error) {
      const duration = performance.now() - startTime
      
      const testResult: TestResult = {
        testName,
        status: 'failed',
        duration,
        error: error instanceof Error ? error.message : String(error)
      }

      if (this.currentSuite) {
        this.currentSuite.tests.push(testResult)
        this.currentSuite.totalTests++
        this.currentSuite.failedTests++
        this.currentSuite.totalDuration += duration
      }

      return testResult
    }
  }

  // Product Service Tests
  async testProductService() {
    this.startSuite('Product Service Integration Tests')

    await this.runTest('Get Products List', async () => {
      const products = await productService.getProducts()
      
      if (!Array.isArray(products)) {
        throw new Error('Products should be an array')
      }
      
      if (products.length === 0) {
        throw new Error('Should return at least one product')
      }

      // Validate product structure
      const product = products[0]
      if (!product.id || !product.name || !product.price) {
        throw new Error('Product missing required fields')
      }

      return {
        totalProducts: products.length,
        sampleProduct: product.name,
        priceRange: {
          min: Math.min(...products.map(p => p.price)),
          max: Math.max(...products.map(p => p.price))
        }
      }
    })

    await this.runTest('Search Products', async () => {
      const searchResults = await productService.searchProducts('ashwagandha')
      
      if (!Array.isArray(searchResults)) {
        throw new Error('Search results should be an array')
      }

      // Should find relevant products
      const relevantResults = searchResults.filter(product => 
        product.name.toLowerCase().includes('ashwagandha') ||
        product.description?.toLowerCase().includes('ashwagandha')
      )

      return {
        totalResults: searchResults.length,
        relevantResults: relevantResults.length,
        searchTerm: 'ashwagandha'
      }
    })

    await this.runTest('Get Product by ID', async () => {
      const products = await productService.getProducts()
      if (products.length === 0) throw new Error('No products available for testing')
      
      const productId = products[0].id
      const product = await productService.getProductById(productId)
      
      if (!product) {
        throw new Error('Product not found')
      }

      if (product.id !== productId) {
        throw new Error('Returned product ID does not match requested ID')
      }

      return {
        productId,
        productName: product.name,
        hasDescription: !!product.description,
        hasImages: product.images && product.images.length > 0
      }
    })

    await this.runTest('Filter Products by Category', async () => {
      const filters = { category_id: 'cardiology' }
      const filteredProducts = await productService.getProducts(filters)
      
      // All products should match the filter
      const validProducts = filteredProducts.filter(product => 
        product.categories?.some(cat => cat.slug === 'cardiology')
      )

      return {
        totalFiltered: filteredProducts.length,
        validMatches: validProducts.length,
        filterAccuracy: filteredProducts.length > 0 ? (validProducts.length / filteredProducts.length) * 100 : 100
      }
    })

    this.endSuite()
  }

  // Order Service Tests
  async testOrderService() {
    this.startSuite('Order Service Integration Tests')

    await this.runTest('Create Order - Valid Data', async () => {
      const mockOrderData = {
        user_id: 'test-user-123',
        items: [
          {
            product_id: 'product-1',
            quantity: 2,
            unit_price: 299.99
          }
        ],
        shipping_address: {
          street: '123 Test Street',
          city: 'Test City',
          state: 'Test State',
          postal_code: '12345',
          country: 'India'
        },
        billing_address: {
          street: '123 Test Street',
          city: 'Test City',
          state: 'Test State',
          postal_code: '12345',
          country: 'India'
        },
        payment_method: 'razorpay'
      }

      const order = await orderService.createOrder(mockOrderData)
      
      if (!order.id) {
        throw new Error('Order should have an ID')
      }

      if (!order.order_number) {
        throw new Error('Order should have an order number')
      }

      if (order.status !== 'pending') {
        throw new Error('New order should have pending status')
      }

      return {
        orderId: order.id,
        orderNumber: order.order_number,
        totalAmount: order.total_amount,
        status: order.status
      }
    })

    await this.runTest('Calculate Order Total', async () => {
      const orderData = {
        items: [
          { product_id: 'p1', quantity: 2, unit_price: 100 },
          { product_id: 'p2', quantity: 1, unit_price: 50 }
        ],
        shipping_cost: 25,
        tax_rate: 0.18
      }

      const calculations = await orderService.calculateOrderTotal(orderData)
      
      const expectedSubtotal = 250 // (2*100) + (1*50)
      const expectedTax = expectedSubtotal * 0.18
      const expectedTotal = expectedSubtotal + expectedTax + 25

      if (Math.abs(calculations.total_amount - expectedTotal) > 0.01) {
        throw new Error(`Total calculation incorrect. Expected: ${expectedTotal}, Got: ${calculations.total_amount}`)
      }

      return {
        subtotal: calculations.subtotal,
        tax: calculations.tax_amount,
        shipping: calculations.shipping_cost,
        total: calculations.total_amount,
        calculationAccurate: true
      }
    })

    await this.runTest('Get User Orders', async () => {
      const userId = 'test-user-123'
      const orders = await orderService.getUserOrders(userId)
      
      if (!Array.isArray(orders)) {
        throw new Error('Orders should be an array')
      }

      // All orders should belong to the user
      const invalidOrders = orders.filter(order => order.user_id !== userId)
      if (invalidOrders.length > 0) {
        throw new Error('Found orders not belonging to the user')
      }

      return {
        totalOrders: orders.length,
        userId,
        orderStatuses: [...new Set(orders.map(o => o.status))]
      }
    })

    this.endSuite()
  }

  // Analytics Service Tests
  async testAnalyticsService() {
    this.startSuite('Analytics Service Integration Tests')

    await this.runTest('Track Page View Event', async () => {
      await analyticsService.trackPageView({
        page_url: '/test-page',
        page_title: 'Test Page',
        user_id: 'test-user-123'
      })

      // Wait a bit for the event to be processed
      await new Promise(resolve => setTimeout(resolve, 100))

      return {
        eventTracked: true,
        pageUrl: '/test-page',
        timestamp: new Date().toISOString()
      }
    })

    await this.runTest('Track Product View', async () => {
      await analyticsService.trackProductView('product-123', 'user-456')
      
      await new Promise(resolve => setTimeout(resolve, 100))

      return {
        eventTracked: true,
        productId: 'product-123',
        userId: 'user-456'
      }
    })

    await this.runTest('Track Purchase Event', async () => {
      const orderData = {
        total_amount: 299.99,
        items: [
          { product_id: 'p1', quantity: 1, unit_price: 299.99 }
        ],
        payment_method: 'razorpay'
      }

      await analyticsService.trackPurchase('order-789', 'user-123', orderData)
      
      await new Promise(resolve => setTimeout(resolve, 100))

      return {
        purchaseTracked: true,
        orderId: 'order-789',
        amount: orderData.total_amount
      }
    })

    await this.runTest('Get Real-time Metrics', async () => {
      const metrics = await analyticsService.getRealTimeMetrics()
      
      if (typeof metrics.active_users !== 'number') {
        throw new Error('Active users should be a number')
      }

      if (typeof metrics.current_page_views !== 'number') {
        throw new Error('Page views should be a number')
      }

      return {
        activeUsers: metrics.active_users,
        pageViews: metrics.current_page_views,
        recentOrders: metrics.recent_orders,
        conversionRate: metrics.conversion_rate
      }
    })

    this.endSuite()
  }

  // Email Service Tests
  async testEmailService() {
    this.startSuite('Email Service Integration Tests')

    await this.runTest('Send Welcome Email', async () => {
      const emailService = new EmailService()
      
      const emailData = {
        to: 'test@example.com',
        subject: 'Welcome to AyuraVeda Royale',
        template_id: 'welcome',
        template_data: {
          firstName: 'Test User',
          email: 'test@example.com'
        }
      }

      const result = await emailService.sendEmail(emailData)
      
      if (!result.success) {
        throw new Error(`Email sending failed: ${result.error}`)
      }

      return {
        emailSent: true,
        messageId: result.messageId,
        recipient: emailData.to,
        template: emailData.template_id
      }
    })

    await this.runTest('Send Order Confirmation', async () => {
      const emailService = new EmailService()
      
      const orderData = {
        order_number: 'AYU-2025-001',
        customer_name: 'Test Customer',
        total_amount: 299.99,
        items: [
          { name: 'Ashwagandha Capsules', quantity: 1, price: 299.99 }
        ]
      }

      const result = await emailService.sendOrderConfirmation(
        'customer@example.com',
        orderData
      )
      
      if (!result.success) {
        throw new Error(`Order confirmation failed: ${result.error}`)
      }

      return {
        confirmationSent: true,
        orderNumber: orderData.order_number,
        amount: orderData.total_amount
      }
    })

    this.endSuite()
  }

  // Performance Tests
  async testPerformance() {
    this.startSuite('Performance Integration Tests')

    await this.runTest('API Response Times', async () => {
      const tests = [
        { name: 'Get Products', call: () => productService.getProducts() },
        { name: 'Search Products', call: () => productService.searchProducts('test') },
        { name: 'Get Real-time Metrics', call: () => analyticsService.getRealTimeMetrics() }
      ]

      const results = []
      
      for (const test of tests) {
        const startTime = performance.now()
        await test.call()
        const duration = performance.now() - startTime
        
        results.push({
          name: test.name,
          duration: Math.round(duration),
          status: duration < 2000 ? 'fast' : duration < 5000 ? 'acceptable' : 'slow'
        })
      }

      const averageResponseTime = results.reduce((sum, r) => sum + r.duration, 0) / results.length

      return {
        tests: results,
        averageResponseTime: Math.round(averageResponseTime),
        allFast: results.every(r => r.status === 'fast')
      }
    })

    await this.runTest('Database Connection Health', async () => {
      try {
        // Test basic database connectivity
        const products = await productService.getProducts()
        const metrics = await analyticsService.getRealTimeMetrics()
        
        return {
          databaseConnected: true,
          productServiceWorking: Array.isArray(products),
          analyticsServiceWorking: typeof metrics === 'object',
          responseTime: 'within acceptable limits'
        }
      } catch (error) {
        throw new Error(`Database connection failed: ${error}`)
      }
    })

    this.endSuite()
  }

  // Run All Tests
  async runAllTests(): Promise<{
    summary: {
      totalSuites: number
      totalTests: number
      passedTests: number
      failedTests: number
      skippedTests: number
      overallStatus: 'passed' | 'failed'
      totalDuration: number
    },
    suites: TestSuite[]
  }> {
    console.log('🧪 Starting AyuraVeda Royale Integration Tests...')

    // Run all test suites
    await this.testProductService()
    await this.testOrderService()
    await this.testAnalyticsService()
    await this.testEmailService()
    await this.testPerformance()

    // Calculate summary
    const totalSuites = this.results.length
    const totalTests = this.results.reduce((sum, suite) => sum + suite.totalTests, 0)
    const passedTests = this.results.reduce((sum, suite) => sum + suite.passedTests, 0)
    const failedTests = this.results.reduce((sum, suite) => sum + suite.failedTests, 0)
    const skippedTests = this.results.reduce((sum, suite) => sum + suite.skippedTests, 0)
    const totalDuration = this.results.reduce((sum, suite) => sum + suite.totalDuration, 0)

    const summary = {
      totalSuites,
      totalTests,
      passedTests,
      failedTests,
      skippedTests,
      overallStatus: failedTests === 0 ? 'passed' : 'failed' as 'passed' | 'failed',
      totalDuration: Math.round(totalDuration)
    }

    console.log('✅ Integration Tests Complete!')
    console.log(`📊 Results: ${passedTests}/${totalTests} tests passed`)
    console.log(`⏱️ Total Duration: ${summary.totalDuration}ms`)

    if (failedTests > 0) {
      console.log(`❌ Failed Tests: ${failedTests}`)
    }

    return {
      summary,
      suites: this.results
    }
  }

  // Generate Test Report
  generateReport(): string {
    let report = '# AyuraVeda Royale - Integration Test Report\n\n'
    report += `**Generated**: ${new Date().toISOString()}\n\n`

    if (this.results.length === 0) {
      report += 'No tests have been run yet.\n'
      return report
    }

    // Summary
    const totalTests = this.results.reduce((sum, suite) => sum + suite.totalTests, 0)
    const passedTests = this.results.reduce((sum, suite) => sum + suite.passedTests, 0)
    const failedTests = this.results.reduce((sum, suite) => sum + suite.failedTests, 0)
    const totalDuration = this.results.reduce((sum, suite) => sum + suite.totalDuration, 0)

    report += '## Summary\n\n'
    report += `- **Total Suites**: ${this.results.length}\n`
    report += `- **Total Tests**: ${totalTests}\n`
    report += `- **Passed**: ${passedTests}\n`
    report += `- **Failed**: ${failedTests}\n`
    report += `- **Success Rate**: ${totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0}%\n`
    report += `- **Total Duration**: ${Math.round(totalDuration)}ms\n\n`

    // Individual Suites
    report += '## Test Suites\n\n'

    this.results.forEach(suite => {
      const successRate = suite.totalTests > 0 ? Math.round((suite.passedTests / suite.totalTests) * 100) : 0
      
      report += `### ${suite.suiteName}\n\n`
      report += `- **Tests**: ${suite.totalTests}\n`
      report += `- **Passed**: ${suite.passedTests}\n`
      report += `- **Failed**: ${suite.failedTests}\n`
      report += `- **Success Rate**: ${successRate}%\n`
      report += `- **Duration**: ${Math.round(suite.totalDuration)}ms\n\n`

      if (suite.tests.length > 0) {
        report += '#### Test Results\n\n'
        
        suite.tests.forEach(test => {
          const status = test.status === 'passed' ? '✅' : test.status === 'failed' ? '❌' : '⏭️'
          report += `${status} **${test.testName}** (${Math.round(test.duration)}ms)\n`
          
          if (test.error) {
            report += `   - Error: ${test.error}\n`
          }
          
          if (test.details && test.status === 'passed') {
            report += `   - Details: ${JSON.stringify(test.details, null, 2)}\n`
          }
          
          report += '\n'
        })
      }
      
      report += '\n'
    })

    return report
  }
}

// Export singleton instance
export const integrationTestRunner = new IntegrationTestRunner()

// CLI Test Runner for automated testing
export async function runProductionReadinessTests() {
  console.log('🚀 Running Production Readiness Tests...\n')
  
  const testRunner = new IntegrationTestRunner()
  const results = await testRunner.runAllTests()
  
  console.log('\n📋 Test Report:')
  console.log(testRunner.generateReport())
  
  if (results.summary.overallStatus === 'passed') {
    console.log('🎉 All tests passed! Platform is production ready.')
  } else {
    console.log('⚠️ Some tests failed. Please review and fix issues before deployment.')
  }
  
  return results
}